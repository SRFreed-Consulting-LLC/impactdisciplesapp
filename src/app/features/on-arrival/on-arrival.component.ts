import { EventService } from './../../../../impactdisciplescommon/src/services/data/event.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { SessionService } from 'impactdisciplescommon/src/services/utils/session.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-on-arrival',
  templateUrl: './on-arrival.component.html',
  styleUrls: ['./on-arrival.component.scss']
})
export class OnArrivalComponent implements OnInit {
  event: EventModel;
  locationId: string;
  sanitizedContent: SafeHtml;
  private ngUnsubscribe = new Subject<void>();

  constructor(private sanitizer: DomSanitizer,
    private eventService: EventService,
    private sessionService: SessionService
  ){}

  async ngOnInit() {
    this.eventService.streamAllByValue('id', await this.sessionService.getCurrentEventId()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(events => {
      this.event = events[0];

      if (typeof this.event.location === 'string') {
        this.locationId = this.event.location;
      } else if (this.event.location && 'id' in this.event.location) {
        this.locationId = this.event.location.id;
      } else {
        this.locationId = undefined;
      }

      if(this.event?.checkinInstructions) {
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.event?.checkinInstructions);
      }
    })
  }
}
