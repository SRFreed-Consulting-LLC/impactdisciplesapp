import { Component, Input, OnInit } from '@angular/core';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { TrainingRoomModel } from 'impactdisciplescommon/src/models/domain/training-room.model';
import Query from 'devextreme/data/query';
import { AgendaItem } from 'impactdisciplescommon/src/models/domain/utils/agenda-item.model';
import { DataService } from 'src/app/admin/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-session-schedule',
  templateUrl: './sessions-schedule.component.html',
  styleUrls: ['./sessions-schedule.component.scss']
})
export class SessionsScheduleComponent implements OnInit {
  @Input('event') event: EventModel;
  trainingDays: TrainingDay[];

  courses: CourseModel[] = [];
  coursesList: CourseModel[] = [];
  coachesList: CoachModel[] = [];
  roomsList: TrainingRoomModel[] = []

  selectedAgendaItem: AgendaItem;
  selecectedCourse: CourseModel;

  groupedAgendaItems: { monthYear: string; days: { date: Date; items: AgendaItem[] }[] }[] = [];

  public isVisible$ = new BehaviorSubject<boolean>(false);

  getCoachById = (id: string) => Query(this.coachesList).filter(['id', '=', id]).toArray()[0];
  getCourseById = (id: string) => Query(this.courses).filter(['id', '=', id]).toArray()[0];
  getRoomById = (id: string) => Query(this.roomsList).filter(['id', '=', id]).toArray()[0];

  constructor(private dataService: DataService){}

  async ngOnInit(): Promise<void> {
    if(!this.event.agendaItems){
      this.event.agendaItems = [];
    } else {
      // this.trainingDays = this.assemble()
      console.log(this.event)
      this.groupAgendaItemsByMonthAndDate(this.event.agendaItems)
    }

    this.courses = this.dataService.getCourses();

    this.coachesList = this.dataService.getCoaches();

    this.roomsList = this.dataService.getRooms();
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

  viewCourse(item:AgendaItem){
    this.selectedAgendaItem = item;
    let course: CourseModel = this.getCourseById(item.course);

    if(course){
      this.selecectedCourse = course;
    }

    this.isVisible$.next(true);
  }

  onCancel(){
    this.isVisible$.next(false);
  }

  private groupAgendaItemsByMonthAndDate(agendaItems: AgendaItem[]) {
    const sessions = agendaItems.filter((item) => item.coaches?.length > 0)
    sessions.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    const groupedByMonthYear = sessions.reduce((acc, item) => {
      const monthYearKey = new Date(item.startDate).toLocaleString('default', { month: 'long', year: 'numeric' });
      const dateKey = new Date(item.startDate).toDateString();

      if (!acc[monthYearKey]) {
        acc[monthYearKey] = {};
      }

      if (!acc[monthYearKey][dateKey]) {
        acc[monthYearKey][dateKey] = [];
      }

      acc[monthYearKey][dateKey].push(item);
      return acc;
    }, {} as { [monthYear: string]: { [date: string]: AgendaItem[] } });

    this.groupedAgendaItems = Object.keys(groupedByMonthYear).map(monthYear => ({
      monthYear: monthYear,
      days: Object.keys(groupedByMonthYear[monthYear])
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .map(date => ({
          date: new Date(date),
          items: groupedByMonthYear[monthYear][date],
        })),
    }));
  }

  assemble(){
    let sessions: TrainingDay[] = [];

    this.event.agendaItems.forEach(item => {
      let trainingDay: TrainingDay = sessions.find(s => new Date(s.date).toDateString() == new Date(item.startDate).toDateString());

      if(!trainingDay){
        trainingDay = new TrainingDay();
        trainingDay.date = item.startDate
        sessions.push(trainingDay);
      }

      let trainingSession: TrainingSession = trainingDay.sessions.find(s => new Date(s.date).toISOString() == new Date(item.startDate).toISOString())

      if(trainingSession){
        trainingSession.courses.push(item)
      } else {
        trainingSession = new TrainingSession();

        trainingSession.date = item.startDate;
        trainingSession.startTime = item.startDate;
        trainingSession.endTime = item.endDate;

        trainingSession.courses.push(item)

        trainingDay.sessions.push(trainingSession)
      }
    })

    sessions.forEach(day => {
      day.sessions.sort((a,b) => new Date(a.date).toISOString().localeCompare(new Date(b.date).toISOString()));

      day.sessions.forEach(ts => {
        if(ts.courses.length == 1){
          ts.title = ts.courses[0].text
          ts.description = ts.courses[0].description
        } else {
          ts.title = "BreakOut Session"
        }
      })
    })
    console.log(sessions)
    return sessions;
  }
}

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
