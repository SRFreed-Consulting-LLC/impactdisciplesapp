import { Component, OnInit } from '@angular/core';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { DataService } from 'src/app/admin/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  event: Promise<EventModel>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.event =  this.dataService.event;
  }

}
