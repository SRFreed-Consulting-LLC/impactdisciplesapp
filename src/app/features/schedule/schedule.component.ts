import { Component, OnInit } from '@angular/core';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { DataService } from 'src/app/admin/data.service';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  event: EventModel;

  selectedIndex: number = 0;
  selectedTab: string = 'Sessions';

  tabs: Tab[] = [
    { id: 0, text: 'Sessions', template: 'Sessions',  icon: 'user' },
    { id: 1, text: 'My Schedule', template: 'My Schedule', icon: 'user' },
  ];

  constructor(private dataService: DataService) { }

  async ngOnInit() {
    this.event = await this.dataService.getEvent();
  }


  selectTab(e) {
    this.selectedTab = e.itemData.template;
  }

}


