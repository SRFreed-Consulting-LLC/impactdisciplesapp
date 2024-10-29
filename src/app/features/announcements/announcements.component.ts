import { Component, Input, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { AnnouncementModel } from 'impactdisciplescommon/src/models/domain/announcement.model.ts';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventAnnouncementService } from 'impactdisciplescommon/src/services/data/event-announcement.service';
import { map, Observable } from 'rxjs';
import { DataService } from 'src/app/admin/data.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  @Input('event') event: EventModel;

  announcements: AnnouncementModel[];

  constructor(private service: EventAnnouncementService,
    private dataService: DataService
  ) { }

  async ngOnInit() {
    this.event = await this.dataService.getEvent();

    if(this.event?.id){
      this.service.streamAllByValue('eventId', this.event.id).subscribe(announcements => this.announcements = announcements)
    }
  }

}
