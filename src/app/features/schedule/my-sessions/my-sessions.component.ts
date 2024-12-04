import { Component, Input, OnInit } from '@angular/core';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';

@Component({
  selector: 'app-my-sessions',
  templateUrl: './my-sessions.component.html',
  styleUrls: ['./my-sessions.component.scss']
})
export class MySessionsComponent implements OnInit {
  @Input('event') event: EventModel;

  constructor() { }

  ngOnInit() {
  }

}
