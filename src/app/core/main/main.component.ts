import { Component, OnInit } from '@angular/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { RouteItem } from 'impactdisciplescommon/src/models/utils/route-item';
import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';
import { TopNavService } from 'impactdisciplescommon/src/services/utils/top-nav.service';
import { AuthService } from 'impactdisciplespwacommon/src/services/events/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  menuItems: string[] = ['Log Off'];

  backButtonOptions: DxButtonTypes.Properties = {
    icon: 'back',
    onClick: () => {
      this.topNavService.back()  ;
    },
  };

  tabsWithIcon: RouteItem[]=[
    { id: 0, name:'Home', route:'home', icon: 'home', level: 0},
    { id: 1, name:'Schedule', route:'schedule', icon: 'event', level: 0},
    { id: 2, name:'Map', route:'map', icon: 'fas fa-map-marked-alt', level: 0},
    { id: 2, name:'User', route:'user-profile', icon: 'user', level: 0}
  ];

  constructor(public topNavService: TopNavService,
    private authService: AuthService) {}

  ngOnInit() {
  }

  tabClicked(e :any){
    this.topNavService.navigate(e.itemData)
  }

  onMenuItemClick(e: DxDropDownButtonTypes.ItemClickEvent): void {
    if(e.itemData == 'Log Off'){
      this.authService.logOut();
    }
  }
}
