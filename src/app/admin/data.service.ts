import { Injectable } from '@angular/core';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { TrainingRoomModel } from 'impactdisciplescommon/src/models/domain/training-room.model';
import { CoachService } from 'impactdisciplescommon/src/services/data/coach.service';
import { CourseService } from 'impactdisciplescommon/src/services/data/course.service';
import { EventService } from 'impactdisciplescommon/src/services/data/event.service';
import { LocationService } from 'impactdisciplescommon/src/services/data/location.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
event: Promise<EventModel>;
coachList: Promise<CoachModel[]>;
coursesList: Promise<CourseModel[]>;
roomsList: Promise<TrainingRoomModel[]>

constructor(eventService: EventService,
  courseService: CourseService,
  coachService: CoachService,
  locationService: LocationService
  ){
    this.event = eventService.getById('wmIs6PJtE7hNGnm15T8a').then(event => {
      this.roomsList = locationService.getById(typeof event.location=='string'? event.location : event.location.id).then(location => {
        return location.trainingrooms;
      })

      return event
    })

    this.coursesList = courseService.getAll();

    this.coachList = coachService.getAll();
  }

}
