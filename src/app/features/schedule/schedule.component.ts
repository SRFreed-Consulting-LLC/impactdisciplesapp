import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/data/event-registration.service';
import { ScheduleModel } from 'src/app/shared/models/schedule.model';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { ResetSchedule } from './schedule.actions';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { EventRegistrationModel } from 'impactdisciplescommon/src/models/domain/event-registration.model';
import { EventService } from 'impactdisciplescommon/src/services/data/event.service';
import { SessionService } from 'impactdisciplescommon/src/services/utils/session.service';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { TrainingRoomModel } from 'impactdisciplescommon/src/models/domain/training-room.model';
import { LocationService } from 'impactdisciplescommon/src/services/data/location.service';
import { CoachService } from 'impactdisciplescommon/src/services/data/coach.service';
import { CourseService } from 'impactdisciplescommon/src/services/data/course.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  event: EventModel;
  selectedIndex: number = 0;
  selectedTab: string = 'My Schedule';
  currentUser: CustomerModel | EventRegistrationModel;
  activeDay: any;
  allCourses: ScheduleModel[];
  fullSchedule: ScheduleModel[];
  myCourses: ScheduleModel[];
  sessionIds: string[]

  coursesList: CourseModel[] = [];
  coachesList: CoachModel[] = [];
  roomsList: TrainingRoomModel[] = [];

  tabs: Tab[] = [
    { id: 0, text: 'My Schedule', template: 'My Schedule',  icon: 'user' },
    { id: 1, text: 'Breakout Sessions', template: 'Breakout Sessions', icon: 'user' },
  ];

  private ngUnsubscribe = new Subject<void>();

  visible: boolean = false;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private eventRegistrationService: EventRegistrationService,
    private scheduleService: ScheduleService,
    private actions$: Actions,
    private store: Store,
    private locationService: LocationService,
    private courseService: CourseService,
    private coachService: CoachService

  ) { }

  async ngOnInit() {
    let eventId: string = (await this.authService.getUserAsPromise() as EventRegistrationModel).eventId;

    this.eventService.streamAllByValue('id', eventId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(async events => {
      this.currentUser = await this.authService.getUserAsPromise();

      this.event = events[0];

      this.coursesList = await this.courseService.getAll();

      this.coachesList = await this.coachService.getAll();

      this.roomsList = await this.locationService.getById(typeof this.event.location=='string'? this.event.location : this.event.location.id).then(location => {
        return location.trainingrooms;
      })

      this.scheduleService.monitorBreakoutCapacity(this.event);

      this.actions$.pipe(ofActionDispatched(ResetSchedule), takeUntil(this.ngUnsubscribe)).subscribe(async () => {
        await this.updateSchedule();
      });

      this.store.dispatch(new ResetSchedule());

      this.visible = true;
    })
  }

  private async updateSchedule() {
    // Fetch session IDs and organize schedules
    this.scheduleService.sessionIds = await this.eventRegistrationService.getUserTrainingSession(
      this.currentUser.email,
      this.event.id
    );
    this.scheduleService.organizeAgendaItems(this.event.agendaItems);

    // Update local properties from AgendaService
    this.updateLocalSchedules();
    this.preselectActiveDay();
  }

  private updateLocalSchedules() {
    this.fullSchedule = this.scheduleService.fullSchedule;
    this.myCourses = this.scheduleService.myCourses;
    this.allCourses = this.scheduleService.allCourses;
  }

  selectTab(e) {
    this.selectedTab = e.itemData.template;
    this.preselectActiveDay()
  }

  selectBreakoutTab() {
    this.selectedTab = this.tabs[1].text;
    this.selectedIndex = this.tabs[1].id
  }

  preselectActiveDay() {
    const today = new Date();
    const futureDates = this.fullSchedule
      .flatMap((monthGroup: any) => monthGroup.days)
      .filter((dayGroup: any) => new Date(dayGroup.date) >= today);

    this.activeDay = futureDates.length > 0 ? futureDates[0] : this.fullSchedule[0]?.days[0];
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}


