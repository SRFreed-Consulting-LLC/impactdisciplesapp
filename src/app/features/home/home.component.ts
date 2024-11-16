import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';
import { DataService } from 'src/app/admin/data.service';
import { Timestamp } from 'firebase/firestore';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { CoachService } from 'impactdisciplescommon/src/services/data/coach.service';
import { forkJoin } from 'rxjs';

export class Announcement {
  id?: string;
  header?: string;
  text?: string;
  time?: string; //change to timestamp
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('today') todayElement!: ElementRef;
  coaches: CoachModel[];
  event: EventModel;
  //TODO: remove and return from event announcements
  announcements: Announcement[] = [
    {
      id: '0',
      header: 'Session Time Change',
      text: 'Disciple Making & Recovery Session will have a 15 minute delay. The new start time is 10:45. This will not affect the rest of your schedule.',
      time: '2025-02-01T00:30:00.000Z'
    },
    {
      id: '1',
      header: 'Session Time Change',
      text: 'Disciple Making & Recovery Session will have a 15 minute delay. The new start time is 10:45. This will not affect the rest of your schedule.',
      time: '2025-02-01T00:35:00.000Z'
    },
    {
      id: '2',
      header: 'Session Time Change',
      text: 'Disciple Making & Recovery Session will have a 15 minute delay. The new start time is 10:45. This will not affect the rest of your schedule.',
      time: '2025-02-01T00:40:00.000Z'
    }
  ];
  itemWidth = window.innerWidth;

  constructor(private dataService: DataService, private coachService: CoachService) { }

  async ngOnInit() {
    this.event = await this.dataService.getEvent();

    const coachIds = Array.from(
      new Set(
        this.event.agendaItems.flatMap(item => item.coaches || [])
      )
    );

    if (coachIds.length > 0) {
      const coachObservables = coachIds.map(id => this.coachService.getById(id));

      forkJoin(coachObservables).subscribe((coaches) => {
        this.coaches = coaches;
      });
    }
  }

  scrollToToday(): void {
    this.todayElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
