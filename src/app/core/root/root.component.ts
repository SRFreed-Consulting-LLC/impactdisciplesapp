import { Component, OnInit } from '@angular/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { ActivatedRoute } from '@angular/router';
import { RouteItem } from 'impactdisciplescommon/src/models/utils/route-item';
import { TopNavService } from 'impactdisciplescommon/src/services/top-nav.service';
import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';
import notify from 'devextreme/ui/notify';
import { AuthService } from 'impactdisciplescommon/src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit{
  menuItems: string[] = ['Log Off'];

  backButtonOptions: DxButtonTypes.Properties = {
    icon: 'back',
    onClick: () => {
      this.topNavService.back()  ;
    },
  };

  tabsWithIcon: RouteItem[];

  constructor(public topNavService: TopNavService, private route: ActivatedRoute, private authService: AuthService) {
    this.tabsWithIcon = [
      { id: 0, name:'Home', route:'home', icon: 'home', level: 0},
      { id: 1, name:'Schedule', route:'schedule', icon: 'toolbox', level: 0},
      { id: 2, name:'Announcements', route:'announcements', icon: 'user', level: 0}
    ];
  }

  ngOnInit() {
    const filter = this.route.snapshot.queryParamMap.get('filter');
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
