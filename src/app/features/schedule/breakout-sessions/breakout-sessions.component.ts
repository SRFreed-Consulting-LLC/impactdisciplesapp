import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import Query from 'devextreme/data/query';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { TrainingRoomModel } from 'impactdisciplescommon/src/models/domain/training-room.model';
import { DataService } from 'src/app/admin/data.service';
import { ShowCourseModal } from '../course-modal/course-modal.actions';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { ScheduleModel } from 'src/app/shared/models/schedule.model';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { confirm } from 'devextreme/ui/dialog';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'impactdisciplescommon/src/services/data/event.service';


@Component({
  selector: 'app-breakout-sessions',
  templateUrl: './breakout-sessions.component.html',
  styleUrls: ['./breakout-sessions.component.scss']
})
export class BreakoutSessionsComponent implements OnInit {
  @Input() allCourses: ScheduleModel[];
  @Input() myCourses: ScheduleModel[];
  @Input() currentUser: CustomerModel;
  @Input() event: EventModel;
  courses: CourseModel[] = [];
  roomsList: TrainingRoomModel[] = [];

  getRoomById = (id: string) => Query(this.roomsList).filter(['id', '=', id]).toArray()[0];
  getCourseById = (id: string) => Query(this.courses).filter(['id', '=', id]).toArray()[0];

  constructor(private dataService: DataService, private store: Store, private scheduleService: ScheduleService, public toster: ToastrService, private eventService: EventService) { }

  ngOnInit() {
    this.courses = this.dataService.getCourses();
    this.roomsList = this.dataService.getRooms();
  }

  getRoomName(id: string){
    let room: TrainingRoomModel = this.getRoomById(id);

    if(room){
      return room.name
    } else {
      return '';
    }
  }

  getCourseTitle(course:CourseModel){
    if(course && course.title){
      return course.title.replace("Breakout: ", "");
    } else {
      return '';
    }
  }

  viewCourse(item: any) {
    if(item.item.isBreakout){
      if(this.viewCourseCapcaity(item.item.id) < item.item.maxParticipants){
        let course: CourseModel = this.getCourseById(item.item.course);
        this.store.dispatch(new ShowCourseModal(item, course, this.currentUser, this.event));
      } else {
        confirm('<i>This session is currently Full. Would you like to be added to the "Wait List"?</i>', 'Session is Full').then(async (dialogResult) => {
          if (dialogResult) {
            if(!item.item.waitList){
              item.item.waitList = [];
            }

            item.item.waitList.push(this.currentUser.email);

            await this.eventService.getById(this.event.id).then(e => {
              let agendaItemId = e.agendaItems.findIndex(agendaItem=> agendaItem.id == item.item.id);

              e.agendaItems[agendaItemId] = item.item;

              this.event = e;

              this.eventService.update(e.id, e).then(e => this.toster.success('You have been successfully added to the waitList!'));
            })



            //add user to wait list
            //pop up a success message
          }
        })
      }
    }
  }

  viewCourseCapcaity(item: any) {
    return this.scheduleService.traininlist.get(item)?.length || 0;
  }
}
