import { Component, OnInit } from '@angular/core';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss']
})
export class InstallComponent {
  selectedIndex: number = 0;
  selectedTab: string = 'Safari';

  tabs: Tab[] = [
    { id: 0, text: 'Safari', template: 'Safari' },
    { id: 1, text: 'Chrome', template: 'Chrome' }
  ];

  selectTab(e) {
    this.selectedTab = e.itemData.template;
  }
}
