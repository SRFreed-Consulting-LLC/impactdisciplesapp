import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { DataService } from 'src/app/admin/data.service';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { CoachService } from 'impactdisciplescommon/src/services/data/coach.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { EventAnnouncementService } from 'impactdisciplescommon/src/services/data/event-announcement.service';
import { AnnouncementModel } from 'impactdisciplescommon/src/models/domain/announcement.model.ts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('today') todayElement!: ElementRef;
  coaches: CoachModel[];
  event: EventModel;
  announcements: AnnouncementModel[];
  selectedAnnouncement: AnnouncementModel;
  itemWidth = window.innerWidth;
  
  public isVisible$ = new BehaviorSubject<boolean>(false);

  constructor(private dataService: DataService, private coachService: CoachService, private eventAnnouncementService: EventAnnouncementService) { }

  async ngOnInit() {
    this.event = await this.dataService.getEvent();

    if(this.event?.id){
      this.eventAnnouncementService.streamAllByValue('eventId', this.event.id).subscribe(announcements => this.announcements = announcements)
    }

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
  
  viewAnnouncement(announcement: AnnouncementModel){
    this.selectedAnnouncement = announcement;

    this.isVisible$.next(true);
  }

  onCancel(){
    this.isVisible$.next(false);
  }


  scrollToToday(): void {
    this.todayElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
