import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { DataService } from 'src/app/admin/data.service';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { CoachService } from 'impactdisciplescommon/src/services/data/coach.service';
import { BehaviorSubject, forkJoin, interval, Subject, takeUntil } from 'rxjs';
import { EventAnnouncementService } from 'impactdisciplescommon/src/services/data/event-announcement.service';
import { AnnouncementModel } from 'impactdisciplescommon/src/models/domain/announcement.model.ts';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { ResetSchedule } from '../schedule/schedule.actions';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/data/event-registration.service';
import { ScheduleModel, UpdatedAgendaItemModel } from 'src/app/shared/models/schedule.model';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import Query from 'devextreme/data/query';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TrainingRoomModel } from 'impactdisciplescommon/src/models/domain/training-room.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('today') todayElement!: ElementRef;
  coaches: CoachModel[];
  event: EventModel;
  currentUser: CustomerModel;
  courses: CourseModel[] = [];
  roomsList: TrainingRoomModel[] = [];
  mySchedule: ScheduleModel[];
  upcomingItem: UpdatedAgendaItemModel | null = null;
  announcements: AnnouncementModel[];
  selectedAnnouncement: AnnouncementModel;
  sanitizedContent: SafeHtml;
  itemWidth = window.innerWidth;
  
  public isVisible$ = new BehaviorSubject<boolean>(false);

  private ngUnsubscribe = new Subject<void>();

  getCourseById = (id: string) => Query(this.courses).filter(['id', '=', id]).toArray()[0];
  getRoomById = (id: string) => Query(this.roomsList).filter(['id', '=', id]).toArray()[0];

  constructor(
    private dataService: DataService, 
    private coachService: CoachService, 
    private authService: AuthService,
    private eventAnnouncementService: EventAnnouncementService,
    private eventRegistrationService: EventRegistrationService,
    private scheduleService: ScheduleService,
    private sanitizer: DomSanitizer,
    private actions$: Actions,
    private store: Store
  ) { }

  async ngOnInit() {
    this.event = await this.dataService.getEvent();
    this.courses = await this.dataService.getCourses();
    this.roomsList = await this.dataService.getRooms();
    this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe)).subscribe((user) => {
      this.currentUser = user;
    });

    if(this.event?.id){
      this.eventAnnouncementService.streamAllByValue('eventId', this.event.id).subscribe(announcements => this.announcements = announcements)
    }
    if(this.event?.whatsNext) {
      this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.event?.whatsNext);
    }

    const coachIds = Array.from(
      new Set(
        this.event.agendaItems.flatMap(item => item.coaches || [])
      )
    );

    if (coachIds.length > 0) {
      const coachObservables = coachIds.map(id => this.coachService.getById(id));

      forkJoin(coachObservables).subscribe((coaches) => {
        this.coaches = coaches;
      });
    }
    this.actions$.pipe(ofActionDispatched(ResetSchedule), takeUntil(this.ngUnsubscribe)).subscribe(async () => {
      await this.updateSchedule();
    });

    this.store.dispatch(new ResetSchedule());

    interval(15000)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.findUpcomingItem();
    });
  }

  private findUpcomingItem(): void {
    const now = new Date();
    const allItems: UpdatedAgendaItemModel[] = this.mySchedule
      .flatMap(group => group.days)
      .flatMap(day => day.timeGroups)
      .flatMap(timeGroup => timeGroup.items);

    const nextItem = allItems
      .filter(item => new Date(item.item.startDate) >= now) // Filter items with startDate >= now
      .sort((a, b) => new Date(a.item.startDate).getTime() - new Date(b.item.startDate).getTime())[0] || null; // Sort by startDate and take the first item

    // Only update if the next item is different from the current upcoming item
    if (nextItem !== this.upcomingItem) {
      this.upcomingItem = nextItem;
      console.log('Upcoming item updated:', this.upcomingItem);
    }
  }

  private async updateSchedule() {
    this.scheduleService.sessionIds = await this.eventRegistrationService.getUserTrainingSession(
      this.currentUser.email,
      this.event.id
    );
    this.scheduleService.organizeAgendaItems(this.event.agendaItems);

    this.updateLocalSchedules();
  }

  private updateLocalSchedules() {
    this.mySchedule = this.scheduleService.mySchedule;
    this.findUpcomingItem();
    console.log(this.mySchedule)
  }
  
  viewAnnouncement(announcement: AnnouncementModel){
    this.selectedAnnouncement = announcement;

    this.isVisible$.next(true);
  }

  scrollToToday(): void {
    this.todayElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  getCourseTitle(course:CourseModel){
    if(course && course.title){
      return course.title.replace("Breakout: ", "");
    } else {
      return '';
    }
  }

  getRoomName(id: string){
    let room: TrainingRoomModel = this.getRoomById(id);

    if(room){
      return room.name
    } else {
      return '';
    }
  }

  onCancel(){
    this.isVisible$.next(false);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
