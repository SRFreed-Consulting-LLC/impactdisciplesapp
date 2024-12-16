import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import Query from 'devextreme/data/query';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { AgendaItem } from 'impactdisciplescommon/src/models/domain/utils/agenda-item.model';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ShowCourseModal } from './course-modal.actions';
import { TrainingRoomModel } from 'impactdisciplescommon/src/models/domain/training-room.model';
import { DataService } from 'src/app/admin/data.service';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/data/event-registration.service';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { confirm } from 'devextreme/ui/dialog';
import { ScheduleModel } from 'src/app/shared/models/schedule.model';
import { ResetSchedule } from '../schedule.actions';

export interface CourseItem {
  course: CourseModel;
  agendaItem: AgendaItem;
}

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss']
})
export class CourseModalComponent implements OnInit, OnDestroy {
  @Input() allCourses: ScheduleModel[];
  customAgendaItem: any;
  courseItem: CourseModel;
  currentUser: CustomerModel;
  event: EventModel;
  roomsList: TrainingRoomModel[] = [];
  coachesList: CoachModel[] = [];
  @Output() courseUpdated: EventEmitter<any> = new EventEmitter<any>();

  public isVisible$ = new BehaviorSubject<boolean>(false);

  private ngUnsubscribe = new Subject<void>();

  getRoomById = (id: string) => Query(this.roomsList).filter(['id', '=', id]).toArray()[0];
  getCoachById = (id: string) => Query(this.coachesList).filter(['id', '=', id]).toArray()[0];

  constructor(private store: Store, private actions$: Actions, private dataService: DataService, private eventRegistrationService: EventRegistrationService){}

  ngOnInit(): void {
    this.roomsList = this.dataService.getRooms();
    this.coachesList = this.dataService.getCoaches();
    this.actions$.pipe(
      ofActionDispatched(ShowCourseModal),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(({ customAgendaItem, course, currentUser, event }: ShowCourseModal) => {
      this.customAgendaItem = customAgendaItem;
      this.courseItem = course;
      this.currentUser = currentUser
      this.event = event
      this.isVisible$.next(true);
    })
  }

  
  getRoomName(id: string){
    let room: TrainingRoomModel = this.getRoomById(id);

    if(room){
      return room.name
    } else {
      return '';
    }
  }

  getCoachImg(id: string){
    let coach: CoachModel = this.getCoachById(id);

    if(coach){
      return coach.photoUrl.url
    } else {
      return '';
    }
  }

  getCoachName(id: string){
    let coach: CoachModel = this.getCoachById(id);

    if(coach){
      return coach.fullname
    } else {
      return '';
    }
  }

  
  getCoachTitle(id: string){
    let coach: CoachModel = this.getCoachById(id);

    if(coach){
      return coach.title
    } else {
      return '';
    }
  }

  addCourse(course: AgendaItem) {
    const conflictingCourse = this.allCourses
    .flatMap(group => group.days)
    .flatMap(day => day.timeGroups)
    .flatMap(timeGroup => timeGroup.items)
    .find(item => 
      item.isAssignedToUser &&
      new Date(item.item.startDate).getTime() === new Date(course.startDate).getTime() &&
      item.item.course !== course.course
    );
    if (conflictingCourse) {
      confirm('<i>You are already assigned to a course at this time. Would you like to remove that course and add the new one?</i>', 'Confirm').then((dialogResult) => {
        if (dialogResult) {
          this.eventRegistrationService
          .unregisterForTrainingSession(this.currentUser.email, conflictingCourse.item.id, this.event.id)
          .then(() => {
            this.eventRegistrationService
              .registerForTrainingSession(this.currentUser.email, course.id, this.event.id)
              .then(() => {
                this.store.dispatch(new ResetSchedule());
                this.isVisible$.next(false);
              });
          });
        }
      });
    } else {
      // Directly add the course if no conflict
      this.eventRegistrationService
        .registerForTrainingSession(this.currentUser.email, course.id, this.event.id)
        .then(() => {
          this.store.dispatch(new ResetSchedule());
          this.isVisible$.next(false);
        });
    }
  }
  
  removeCourse(course: AgendaItem) {
    confirm('<i>Are you sure you want to remove this course from your schedule?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.eventRegistrationService
        .unregisterForTrainingSession(this.currentUser.email, course.id, this.event.id)
        .then(() => {
          this.store.dispatch(new ResetSchedule());
          this.isVisible$.next(false)
        });
      }
    });
  }

  onCancel(){
    this.isVisible$.next(false);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
