import { Component, OnInit } from '@angular/core';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';
import { DataService } from 'src/app/admin/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  event: EventModel;

  selectedIndex: number = 0;
  selectedTab: string = 'Welcome';

  tabs: Tab[] = [
    { id: 0, text: 'Welcome', template: 'Welcome',  icon: 'user' },
    { id: 1, text: 'FAQ', template: 'FAQ', icon: 'user' },
  ];

  constructor(private dataService: DataService) { }

  async ngOnInit() {
    this.event = await this.dataService.getEvent();
  }


  selectTab(e) {
    this.selectedTab = e.itemData.template;
  }
}
