import { DataService } from './../../admin/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WhereFilterOperandKeys } from 'impactdisciplescommon/src/dao/firebase.dao';
import { EventRegistrationModel } from 'impactdisciplescommon/src/models/domain/event-registration.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventService } from 'impactdisciplescommon/src/services/data/event.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-event-selector',
  templateUrl: './event-selector.component.html',
  styleUrls: ['./event-selector.component.css']
})
export class EventSelectorComponent implements OnInit {
  registeredEventsList: EventModel[];

  constructor(private cookieService: CookieService,
    private eventService: EventService,
    private router: Router,
    private dataService: DataService
  ) { }

  async ngOnInit() {
    const cookieValue = this.cookieService.get("REGISTERED_EVENTS");

    let registrations: EventRegistrationModel[] = JSON.parse(cookieValue);

    let ids: string[] = registrations.map(reg => reg.eventId)

    let registeredEvents: EventModel[] = await this.eventService.queryAllByValue('id', WhereFilterOperandKeys.in, ids);

    if(registeredEvents && registeredEvents.length == 1){
      this.dataService.initializeEvent(registeredEvents[0]);
      this.router.navigate(['home']);
    } else {
      this.registeredEventsList = registeredEvents;
    }
  }

  selectEvent(event: EventModel){
    this.dataService.initializeEvent(event);
    this.router.navigate(['home'])
  }

}
