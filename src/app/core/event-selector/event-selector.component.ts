import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryParam, WhereFilterOperandKeys } from 'impactdisciplescommon/src/dao/firebase.dao';
import { EventRegistrationModel } from 'impactdisciplescommon/src/models/domain/event-registration.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventService } from 'impactdisciplescommon/src/services/data/event.service';
import { CookieService } from 'ngx-cookie-service';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/data/event-registration.service';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'impactdisciplescommon/src/services/utils/session.service';

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

  spinnerVisible: boolean = false;

  constructor(private cookieService: CookieService,
    private eventService: EventService,
    private eventRegistrationService: EventRegistrationService,
    private router: Router,
    private sessionService: SessionService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    const cookieValue = this.cookieService.get("REGISTERED_EVENTS");

    this.registrations = JSON.parse(cookieValue);

    let ids: string[] = this.registrations.map(reg => reg.eventId)

    let registeredEvents: EventModel[] = await this.eventService.queryAllByValue('id', WhereFilterOperandKeys.in, ids);

    if(!registeredEvents || registeredEvents.length == 0){
      this.toastr.error("There was an error finding the events for which you have registered. Please contact Tech Support at 'info@impactdisciples.com' for help!", "System Error")
    } else if(registeredEvents && registeredEvents.length == 1){
      this.errorFound = false;

      let registration: EventRegistrationModel = this.registrations.find(reg => reg.eventId == registeredEvents[0].id);

      this.setUser(registration);

      this.setLoggedIn(registration)

      this.checkForMultipleRegistrations(registeredEvents[0]);
    } else {
      this.errorFound = false;
      this.registeredEventsList = registeredEvents;
    }
  }

  async selectEvent(event: EventModel){
    this.errorFound = false;

    this.checkForMultipleRegistrations(event);
  }

  setLoggedIn(registration: EventRegistrationModel){
    registration.loggedIn = true;

    this.eventRegistrationService.update(registration.id, registration);
  }

  setUser(registration: EventRegistrationModel){
    return this.authService.setUser(registration);
  }

  async checkForMultipleRegistrations(event:EventModel){
    this.emailAddressUsed = this.registrations[0].email.toLowerCase();

    let params: QueryParam[] = [];
    params.push(new QueryParam('email', WhereFilterOperandKeys.equal, this.emailAddressUsed));
    params.push(new QueryParam('eventId', WhereFilterOperandKeys.equal, event.id));

    this.eventRegistrationService.queryAllByMultiValue(params).then(async registrations => {
      if(registrations && registrations.length == 1){
        this.spinnerVisible = true;

        this.setLoggedIn(registrations[0]);

        this.setUser(registrations[0]);

        this.sessionService.setCurrentEventId(registrations[0].eventId);

        this.spinnerVisible = false;

        this.router.navigate(['home'])
      } else {
        this.errorFound = true;
      }
    })

  }

}
