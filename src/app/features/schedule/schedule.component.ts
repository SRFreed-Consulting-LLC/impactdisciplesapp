import { Component, OnInit } from '@angular/core';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { TrainingRoomModel } from 'impactdisciplescommon/src/models/domain/training-room.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import Query from 'devextreme/data/query';
import { AgendaItem } from 'impactdisciplescommon/src/models/domain/utils/agenda-item.model';
import { DataService } from 'src/app/admin/data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  event: Promise<EventModel>;
  trainingSessions: Map<string, TrainingSession[]>;

  courses: CourseModel[] = [];
  coursesList: CourseModel[] = [];
  coachesList: CoachModel[] = [];
  roomsList: TrainingRoomModel[] = []

  getCoachById = (id: string) => Query(this.coachesList).filter(['id', '=', id]).toArray()[0];
  getCourseById = (id: string) => Query(this.courses).filter(['id', '=', id]).toArray()[0];
  getRoomById = (id: string) => Query(this.roomsList).filter(['id', '=', id]).toArray()[0];

  constructor(private dataService: DataService){}

  async ngOnInit(): Promise<void> {
    this.event =  this.dataService.event.then(async event => {
      if(!event.agendaItems){
        event.agendaItems = [];
      } else {
        this.trainingSessions = this.groupByDateValue(event.agendaItems, 'startDate');
      }

      this.courses = await this.dataService.coursesList;

      this.coachesList = await this.dataService.coachList;

      this.roomsList = await this.dataService.roomsList;

      return event;
    })
  }

  groupByDateValue(agendaItems: AgendaItem[], groupField: string){
    let retval:  Map<string, TrainingSession[]> = new  Map<string, TrainingSession[]>();
    let sessions: TrainingSession[] = [];

    agendaItems.forEach(agendaItem => {
      let foundTS: TrainingSession = sessions.find(item => {
        return item[groupField].toISOString() == agendaItem[groupField].toISOString()
      })

      if(!foundTS){
        let ts = new TrainingSession();
        ts.startDate = dateFromTimestamp(agendaItem.startDate)
        ts.endDate = dateFromTimestamp(agendaItem.endDate);
        ts.courses = [];
        sessions.push(ts)
      }
    })

    agendaItems.forEach(agendaItem => {
      let foundTS: TrainingSession = sessions.find(item => item.startDate.toISOString() == agendaItem.startDate.toISOString())

      foundTS.courses.push(agendaItem);
    })

    sessions.forEach(ts => {
      if(ts.courses.length == 1){
        ts.title = ts.courses[0].text
        ts.description = ts.courses[0].description
      } else {
        ts.title = "BreakOut Session"
      }
    })

    sessions.sort((a,b) => a.startDate.toISOString().localeCompare(b.startDate.toISOString()));

    sessions.forEach(element => {
      let day: string = element.startDate.toDateString()

      if(!retval.has(day)){
        retval.set(day, []);
      }

      retval.get(day).push(element)
    });

    return retval;
  }

  getCoachesList(ids: string[]){
    let coaches: string[] = [];

    ids.forEach(id => {
      let coach: CoachModel = this.getCoachById(id);
      coaches.push(coach.firstName +' '+ coach.lastName);
    })

    return coaches.join(', ');
  }

  getSessionTitle(session:TrainingSession){
    if(session.courses.length > 1){
      return 'Breakout Session'
    } else if(session.courses.length == 1) {
      if(session.courses[0].course){
        return this.getCourseById(session.courses[0].course).title
      } else {
        return session.title;
      }
    }
  }

  getCourseTitle(course:CourseModel){
    return course.title.replace("Breakout: ", "");
  }

  getCoachList(coaches: string[]){
    let coachList: string[] = [];

    coaches.forEach(coach => {
      coachList.push(this.getCoachById(coach).fullname)
    })

    return coachList.join(", ");
  }

}

export class TrainingSession{
  startDate: Date;
  endDate: Date;
  title: string;
  description: string;
  courses: AgendaItem[] = [];
}
