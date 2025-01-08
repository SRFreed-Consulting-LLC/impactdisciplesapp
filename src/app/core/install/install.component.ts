import { Component, OnInit } from '@angular/core';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss']
})
export class InstallComponent {
  selectedIndex: number = 0;
  selectedTab: string = 'IOS';

  tabs: Tab[] = [
    { id: 0, text: 'IOS', template: 'IOS' },
    { id: 1, text: 'ANDROID', template: 'ANDROID' }
  ];

  selectTab(e) {
    this.selectedTab = e.itemData.template;
  }
}
