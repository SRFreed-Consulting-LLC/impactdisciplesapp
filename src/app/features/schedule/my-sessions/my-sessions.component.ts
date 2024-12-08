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

@Component({
  selector: 'app-my-sessions',
  templateUrl: './my-sessions.component.html',
  styleUrls: ['./my-sessions.component.scss']
})
export class MySessionsComponent implements OnInit {
  @Input() allCourses: ScheduleModel[];
  @Input() myCourses: ScheduleModel[];
  @Input() currentUser: CustomerModel;
  @Input() event: EventModel;
  courses: CourseModel[] = [];
  roomsList: TrainingRoomModel[] = [];

  getRoomById = (id: string) => Query(this.roomsList).filter(['id', '=', id]).toArray()[0];
  getCourseById = (id: string) => Query(this.courses).filter(['id', '=', id]).toArray()[0];

  constructor(private dataService: DataService, private store: Store) { }

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
    let course: CourseModel = this.getCourseById(item.item.course);
    this.store.dispatch(new ShowCourseModal(item, course, this.currentUser, this.event));
  }

}
