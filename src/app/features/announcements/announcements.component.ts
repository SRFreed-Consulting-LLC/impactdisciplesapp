import { Component, Input, OnInit } from '@angular/core';
import { AnnouncementModel } from 'impactdisciplescommon/src/models/domain/announcement.model.ts';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventAnnouncementService } from 'impactdisciplescommon/src/services/data/event-announcement.service';
import { EventService } from 'impactdisciplescommon/src/services/data/event.service';
import { SessionService } from 'impactdisciplescommon/src/services/utils/session.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  @Input('event') event: EventModel;

  announcements: AnnouncementModel[];

  private ngUnsubscribe = new Subject<void>();

  constructor(private service: EventAnnouncementService,
    private eventService: EventService,
    private sessionService: SessionService
  ) { }

  async ngOnInit() {
    this.eventService.streamAllByValue('id', await this.sessionService.getCurrentEventId()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(events => {
      this.event = events[0];

      if(this.event?.id){
        this.service.streamAllByValue('eventId', this.event.id).subscribe(announcements => this.announcements = announcements)
      }
    })
  }

}
