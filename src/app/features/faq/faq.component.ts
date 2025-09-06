import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventService } from 'impactdisciplescommon/src/services/data/event.service';
import { SessionService } from 'impactdisciplescommon/src/services/utils/session.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  event: EventModel;

  private ngUnsubscribe = new Subject<void>();

  constructor(private sanitizer: DomSanitizer,
    private eventService: EventService,
    private sessionService: SessionService
  ){}

  async ngOnInit() {
    this.eventService.streamAllByValue('id', await this.sessionService.getCurrentEventId()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(events => {
      this.event = events[0];
    })
  }

  sanitizeHtml(html: string | undefined): SafeHtml {
    return html ? this.sanitizer.bypassSecurityTrustHtml(html) : '';
  }
}
