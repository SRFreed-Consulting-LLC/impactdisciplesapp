import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { DataService } from 'src/app/admin/data.service';

@Component({
  selector: 'app-on-arrival',
  templateUrl: './on-arrival.component.html',
  styleUrls: ['./on-arrival.component.scss']
})
export class OnArrivalComponent implements OnInit {
  event: EventModel;
  locationId: string;
  sanitizedContent: SafeHtml;

  constructor(private dataService: DataService, private sanitizer: DomSanitizer){}

  async ngOnInit() {
    this.event = await this.dataService.getEvent();
    if (typeof this.event.location === 'string') {
      this.locationId = this.event.location; 
    } else if (this.event.location && 'id' in this.event.location) {
      this.locationId = this.event.location.id; 
    } else {
      this.locationId = undefined; 
    }
    console.log(this.event)
    if(this.event?.checkinInstructions) {
      this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.event?.checkinInstructions);
    }
  }
}
