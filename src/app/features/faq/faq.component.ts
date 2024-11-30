import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { DataService } from 'src/app/admin/data.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  event: EventModel;

  constructor(private dataService: DataService, private sanitizer: DomSanitizer){}

  async ngOnInit() {
    this.event = await this.dataService.getEvent();
  }

  sanitizeHtml(html: string | undefined): SafeHtml {
    return html ? this.sanitizer.bypassSecurityTrustHtml(html) : '';
  }
}
