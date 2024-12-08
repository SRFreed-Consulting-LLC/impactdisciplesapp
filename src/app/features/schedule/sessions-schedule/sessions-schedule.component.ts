import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { TrainingRoomModel } from 'impactdisciplescommon/src/models/domain/training-room.model';
import Query from 'devextreme/data/query';
import { AgendaItem } from 'impactdisciplescommon/src/models/domain/utils/agenda-item.model';
import { DataService } from 'src/app/admin/data.service';
import { Store } from '@ngxs/store';
import { ShowCourseModal } from '../course-modal/course-modal.actions';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/data/event-registration.service';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { confirm } from 'devextreme/ui/dialog';

export class TrainingDay{
  date: Date;
  sessions: TrainingSession[] = [];

}
export class TrainingSession{
  date: Date;
  startTime: Date;
  endTime: Date;
  title: string;
  description: string;
  courses: AgendaItem[] = [];
}

@Component({
  selector: 'app-session-schedule',
  templateUrl: './sessions-schedule.component.html',
  styleUrls: ['./sessions-schedule.component.scss']
})
export class SessionsScheduleComponent implements OnInit {
  @Input('event') event: EventModel;
  @Input() fullSchedule: { monthYear: string; days: { date: Date; timeGroups: { date: Date; items: { isAssignedToUser: boolean; item: AgendaItem }[]; }[]; }[]; }[] = [];
  @Input() activeDay: any;
  @Input() currentUser: CustomerModel;
  @Output() courseUpdated: EventEmitter<any> = new EventEmitter<any>();
  trainingDays: TrainingDay[];

  courses: CourseModel[] = [];
  coursesList: CourseModel[] = [];
  coachesList: CoachModel[] = [];
  roomsList: TrainingRoomModel[] = []
  selectedAgendaItem: AgendaItem;

  getCoachById = (id: string) => Query(this.coachesList).filter(['id', '=', id]).toArray()[0];
  getCourseById = (id: string) => Query(this.courses).filter(['id', '=', id]).toArray()[0];
  getRoomById = (id: string) => Query(this.roomsList).filter(['id', '=', id]).toArray()[0];

  constructor(private dataService: DataService, private store: Store, private eventRegistrationService: EventRegistrationService, private authService: AuthService, private cd: ChangeDetectorRef){}

  async ngOnInit() {
    this.courses = await this.dataService.getCourses();

    this.coachesList = await this.dataService.getCoaches();

    this.roomsList = await this.dataService.getRooms();

  }

  isUserAssignedToItem(agendaItem: { isAssignedToUser: boolean; item: AgendaItem }): boolean {
    return agendaItem.isAssignedToUser;
  }
  
  isAnyItemAssignedInGroup(timeGroup: { date: Date; items: { isAssignedToUser: boolean; item: AgendaItem }[] }): boolean {
    return timeGroup.items.some(item => item.isAssignedToUser);
  }
  
  addCourse(agendaItem: AgendaItem, timeGroup: any) {
    this.eventRegistrationService
      .registerForTrainingSession(this.currentUser.email, agendaItem.id, this.event.id)
      .then(() => {
        this.courseUpdated.emit(timeGroup);
      });
  }
  
  removeCourse(agendaItem: AgendaItem, timeGroup: any) {
    confirm('<i>Are you sure you want to remove this course from your schedule?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.eventRegistrationService
          .unregisterForTrainingSession(this.currentUser.email, agendaItem.id, this.event.id)
          .then(() => {
            this.courseUpdated.emit(timeGroup);
          });
      }
    });
  }

  setActiveDay(dayGroup: any) {
    this.activeDay = dayGroup;
  }

  getCourseTitle(course:CourseModel){
    if(course && course.title){
      return course.title.replace("Breakout: ", "");
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

  getRoomName(id: string){
    let room: TrainingRoomModel = this.getRoomById(id);

    if(room){
      return room.name
    } else {
      return '';
    }
  }

  getCoachList(coaches: string[]){
    let coachList: string[] = [];

    coaches.forEach(coach => {
      coachList.push(this.getCoachName(coach))
    })

    return coachList.join(", ");
  }

  viewCourse(item: any) {
    let course: CourseModel = this.getCourseById(item.item.course);
    this.store.dispatch(new ShowCourseModal(item, course, this.currentUser, this.event));
  }

}
