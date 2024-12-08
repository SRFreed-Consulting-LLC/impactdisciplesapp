import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { DataService } from 'src/app/admin/data.service';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';
import { AgendaItem } from 'impactdisciplescommon/src/models/domain/utils/agenda-item.model';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/data/event-registration.service';
import { ScheduleModel } from 'src/app/shared/models/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  event: EventModel;
  selectedIndex: number = 0;
  selectedTab: string = 'Schedule';
  currentUser: CustomerModel;
  activeDay: any;
  allCourses: ScheduleModel[];
  fullSchedule: ScheduleModel[];
  myCourses: ScheduleModel[];
  sessionIds: string[]

  tabs: Tab[] = [
    { id: 0, text: 'Schedule', template: 'Schedule',  icon: 'user' },
    { id: 1, text: 'My Sessions', template: 'My Sessions', icon: 'user' },
  ];

  private ngUnsubscribe = new Subject<void>();

  constructor(private dataService: DataService, private authService: AuthService, private eventRegistrationService: EventRegistrationService, private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    this.event = await this.dataService.getEvent();
    this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe)).subscribe((user) => {
      this.currentUser = user;
    });
    this.sessionIds = await this.eventRegistrationService.getUserTrainingSession(this.currentUser.email, this.event.id);
 
    if (this.event.agendaItems) {
      this.organizeAgendaItems(this.event.agendaItems);
      this.preselectActiveDay();
    }
  }

  async handleCourseUpdate(timeGroup: any) {
    this.sessionIds = await this.eventRegistrationService.getUserTrainingSession(this.currentUser.email, this.event.id);
    this.organizeAgendaItems(this.event.agendaItems);
  
    this.selectedTab = this.tabs[1].text;
    this.selectedIndex = this.tabs[1].id
  }

  selectTab(e) {
    this.selectedTab = e.itemData.template;
    this.preselectActiveDay()
  }

  preselectActiveDay() {
    const today = new Date();
    const futureDates = this.fullSchedule
      .flatMap((monthGroup: any) => monthGroup.days)
      .filter((dayGroup: any) => new Date(dayGroup.date) >= today);

    this.activeDay = futureDates.length > 0 ? futureDates[0] : this.fullSchedule[0]?.days[0];
  }

  public organizeAgendaItems(agendaItems: AgendaItem[]) {
    const sortedItems = [...agendaItems].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    const groupedAgendaItems = this.groupByDateAndTime(sortedItems);
  
    // Create fullSchedule
    this.fullSchedule = groupedAgendaItems.map((group) => ({
      monthYear: group.monthYear,
      days: group.days.map((day) => ({
        date: day.date,
        timeGroups: this.groupItemsByTime(day.items),
      })),
    }));
  
    // Create myCourses based on sessionIds
    this.myCourses = this.fullSchedule.map((group) => ({
      monthYear: group.monthYear,
      days: group.days.map((day) => ({
        date: day.date,
        timeGroups: day.timeGroups.map((timeGroup) => ({
          date: timeGroup.date,
          items: timeGroup.items.filter((agendaItem) => this.sessionIds.includes(agendaItem.item.id)),
        })).filter((timeGroup) => timeGroup.items.length > 0), // Remove empty timeGroups
      })).filter((day) => day.timeGroups.length > 0), // Remove empty days
    })).filter((group) => group.days.length > 0);

    this.allCourses = this.fullSchedule.map((group) => ({
      monthYear: group.monthYear,
      days: group.days.map((day) => ({
        date: day.date,
        timeGroups: day.timeGroups.map((timeGroup) => ({
          date: timeGroup.date,
          items: timeGroup.items.filter((agendaItem) => agendaItem.item.isCourse),
        })).filter((timeGroup) => timeGroup.items.length > 0),
      })).filter((day) => day.timeGroups.length > 0),
    })).filter((group) => group.days.length > 0);
  
    // Mark isAssignedToUser in fullSchedule
    this.markAssignedItems();
  }

  public groupByDateAndTime(items: AgendaItem[]) {
    const groupedByMonthYear = items.reduce((acc, item) => {
      const monthYear = new Date(item.startDate).toLocaleString('default', { month: 'long', year: 'numeric' });
      const date = new Date(item.startDate).toDateString();
      acc[monthYear] = acc[monthYear] || {};
      acc[monthYear][date] = acc[monthYear][date] || [];
      acc[monthYear][date].push(item);
      return acc;
    }, {});

    return Object.entries(groupedByMonthYear).map(([monthYear, days]) => ({
      monthYear,
      days: Object.entries(days)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([date, items]) => ({ date: new Date(date), items })),
    }));
  }

  public groupItemsByTime(items: AgendaItem[]): { date: Date; items: { isAssignedToUser: boolean; item: AgendaItem }[] }[] {
    const groupedByDate = items.reduce((acc, item) => {
      const dateKey = new Date(item.startDate).toISOString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
  
      // Initialize isAssignedToUser as false
      acc[dateKey].push({ isAssignedToUser: false, item });
      return acc;
    }, {} as { [date: string]: { isAssignedToUser: boolean; item: AgendaItem }[] });
  
    return Object.keys(groupedByDate).map((dateKey) => ({
      date: new Date(dateKey),
      items: groupedByDate[dateKey],
    }));
  }

  public markAssignedItems() {
    // Iterate through fullSchedule and compare items with myCourses
    this.fullSchedule.forEach((group) => {
      group.days.forEach((day) => {
        day.timeGroups.forEach((timeGroup) => {
          timeGroup.items.forEach((item) => {
            // Check if the item exists in myCourses
            const isAssigned = this.myCourses.some((myGroup) =>
              myGroup.days.some((myDay) =>
                myDay.timeGroups.some((myTimeGroup) =>
                  myTimeGroup.items.some((myItem) => myItem.item.id === item.item.id)
                )
              )
            );
            item.isAssignedToUser = isAssigned; // Mark the item as assigned if a match is found
          });
        });
      });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}


