import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { DataService } from './../../admin/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryParam, WhereFilterOperandKeys } from 'impactdisciplescommon/src/dao/firebase.dao';
import { EventRegistrationModel } from 'impactdisciplescommon/src/models/domain/event-registration.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventService } from 'impactdisciplescommon/src/services/data/event.service';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/data/event-registration.service';

const COOKIE_NAME = "impact-disciples-app"

@Component({
  selector: 'app-event-selector',
  templateUrl: './event-selector.component.html',
  styleUrls: ['./event-selector.component.scss']
})
export class EventSelectorComponent implements OnInit {
  registeredEventsList: EventModel[];

  registrations: EventRegistrationModel[]

  emailAddressUsed: string;

  errorFound:boolean = false;

  constructor(private cookieService: CookieService,
    private eventService: EventService,
    private eventRegistrationService: EventRegistrationService,
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    const cookieValue = this.cookieService.get("REGISTERED_EVENTS");

    this.registrations = JSON.parse(cookieValue);

    let ids: string[] = this.registrations.map(reg => reg.eventId)

    let registeredEvents: EventModel[] = await this.eventService.queryAllByValue('id', WhereFilterOperandKeys.in, ids);

    if(registeredEvents && registeredEvents.length == 1){
      this.errorFound = false;
      this.dataService.initializeEvent(registeredEvents[0]);
      this.checkForMultipleRegistrations(registeredEvents[0]);
    } else {
      this.registeredEventsList = registeredEvents;
    }
  }

  selectEvent(event: EventModel){
    this.errorFound = false;
    this.dataService.initializeEvent(event);
    this.checkForMultipleRegistrations(event);
  }

  setUserCookie(event:EventModel){
    let registration: EventRegistrationModel = this.registrations.find(reg => reg.eventId == event.id);
    this.cookieService.set(COOKIE_NAME, JSON.stringify(registration), { expires: 3 });

    registration.loggedIn = true;

    this.eventRegistrationService.update(registration.id, registration);

    return this.authService.setUser(registration);
  }

  checkForMultipleRegistrations(event:EventModel){
    this.setUserCookie(event).pipe(take(1)).subscribe(reg => {
      this.emailAddressUsed = reg.email.toLowerCase();

      let params: QueryParam[] = [];
      params.push(new QueryParam('email', WhereFilterOperandKeys.equal, this.emailAddressUsed));
      params.push(new QueryParam('eventId', WhereFilterOperandKeys.equal, event.id));

      this.eventRegistrationService.queryAllByMultiValue(params).then(registrations => {
        if(registrations && registrations.length == 1){
          this.router.navigate(['home'])
        } else {
          this.errorFound = true;
        }
      })
    });
  }

}
