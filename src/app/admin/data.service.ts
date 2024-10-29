import { Injectable } from '@angular/core';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { TrainingRoomModel } from 'impactdisciplescommon/src/models/domain/training-room.model';
import { CoachService } from 'impactdisciplescommon/src/services/data/coach.service';
import { CourseService } from 'impactdisciplescommon/src/services/data/course.service';
import { LocationService } from 'impactdisciplescommon/src/services/data/location.service';
import { Router } from '@angular/router';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { OrganizationService } from 'impactdisciplescommon/src/services/data/organization.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private event: EventModel;
private coachList: CoachModel[];
private coursesList: CourseModel[];
private roomsList: TrainingRoomModel[]
private organizationsList: OrganizationModel[]

constructor(private courseService: CourseService,
  private coachService: CoachService,
  private locationService: LocationService,
  private organizationService: OrganizationService,
  private router: Router){}

  public async initializeEvent(event: EventModel){
    this.event = event;

    localStorage.clear();
    localStorage.setItem("SELECTED_EVENT", JSON.stringify(event))

    this.organizationsList = await this.organizationService.getAll();

    localStorage.setItem("ORGANIZATIONSLIST", JSON.stringify(this.organizationsList))

    this.roomsList = await this.locationService.getById(typeof this.event.location=='string'? this.event.location : this.event.location.id).then(location => {
      return location.trainingrooms;
    })

    localStorage.setItem("ROOMSLIST", JSON.stringify(this.roomsList))

    this.coursesList = await this.courseService.getAll();

    localStorage.setItem("COURSESLIST", JSON.stringify(this.coursesList))

    this.coachList = await this.coachService.getAll();

    localStorage.setItem("COACHESLIST", JSON.stringify(this.coachList))
  }

  getEvent(){
    if(this.event){
      console.log('found')
      return this.event;
    } else if(localStorage.getItem("SELECTED_EVENT")){
      console.log('found from cookie')
      return JSON.parse(localStorage.getItem("SELECTED_EVENT")) as EventModel;
    } else {
      console.log('not found')
      this.router.navigate(['/event-selector'])

      return null;
    }
  }

  getOrganizations(){
    if(this.organizationsList){
      return this.organizationsList;
    } else if(localStorage.getItem("ORGANIZATIONSLIST")){
      return JSON.parse(localStorage.getItem("ORGANIZATIONSLIST")) as OrganizationModel[];
    } else {
      this.router.navigate(['/event-selector'])

      return null;
    }
  }

  getRooms(){
    if(this.roomsList){
      return this.roomsList;
    } else if(localStorage.getItem("ROOMSLIST")){
      return JSON.parse(localStorage.getItem("ROOMSLIST")) as TrainingRoomModel[];
    } else {
      this.router.navigate(['/event-selector'])

      return null;
    }
  }

  getCourses(){
    if(this.coursesList){
      return this.coursesList;
    } else if(localStorage.getItem("COURSESLIST")){
      return JSON.parse(localStorage.getItem("COURSESLIST")) as CourseModel[];
    } else {
      this.router.navigate(['/event-selector'])

      return null;
    }
  }

  getCoaches(){
    if(this.coachList){
      return this.coachList;
    } else if(localStorage.getItem("COACHESLIST")){
      return JSON.parse(localStorage.getItem("COACHESLIST")) as CoachModel[];
    } else {
      this.router.navigate(['/event-selector'])

      return null;
    }
  }
}
