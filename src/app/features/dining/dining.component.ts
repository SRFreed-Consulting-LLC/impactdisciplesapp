import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { AgendaItem } from 'impactdisciplescommon/src/models/domain/utils/agenda-item.model';
import { EventService } from 'impactdisciplescommon/src/services/data/event.service';
import { SessionService } from 'impactdisciplescommon/src/services/utils/session.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dining',
  templateUrl: './dining.component.html',
  styleUrls: ['./dining.component.scss']
})
export class DiningComponent {
  event: EventModel;
  sanitizedContent: SafeHtml;
  diningSchedule: { date: string; items: AgendaItem[] }[] = [];

  private ngUnsubscribe = new Subject<void>();

  constructor(private sanitizer: DomSanitizer,
    private eventService: EventService,
    private sessionService: SessionService
  ){}

  async ngOnInit() {
    this.eventService.streamAllByValue('id', await this.sessionService.getCurrentEventId()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(events => {
      this.event = events[0];

      if(this.event?.diningOptions) {
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.event?.diningOptions);
      }
      if (this.event?.agendaItems) {
        // Filter agenda items with isFoodBreak = true
        const foodBreakItems = this.event.agendaItems.filter(item => item.isFoodBreak);

        // Group items by their date
        const grouped = foodBreakItems.reduce((acc, item) => {
          const dateKey = this.getDateKey(item.startDate); // Get a standardized date string
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(item);
          return acc;
        }, {});

        // Convert the grouped object to an array for easy rendering
        this.diningSchedule = Object.keys(grouped).map(date => ({
          date,
          items: grouped[date],
        }));
      }
    })
  }

  // Helper to convert startDate to a standardized string
  private getDateKey(date: any): string {
    const convertedDate = this.convertToDate(date); // Convert to Date if necessary
    return convertedDate.toDateString(); // Use toDateString for grouping
  }

  // Helper to convert a Timestamp or other date-like object to a Date
  private convertToDate(date: any): Date {
    if (date.toDate) {
      // If it's a Firebase Timestamp, call toDate()
      return date.toDate();
    }
    return new Date(date); // Otherwise, assume it's a valid date or string
  }
}
