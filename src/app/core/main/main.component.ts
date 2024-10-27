import { Component, OnInit } from '@angular/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { ActivatedRoute } from '@angular/router';
import { RouteItem } from 'impactdisciplescommon/src/models/utils/route-item';
import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';
import { TopNavService } from 'impactdisciplescommon/src/services/utils/top-nav.service';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { take } from 'rxjs';
import { FcmMessageService } from 'impactdisciplescommon/src/services/utils/FCMMessageService.service';
import { AppUser } from 'impactdisciplescommon/src/models/admin/appuser.model';

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

  tabsWithIcon: RouteItem[];

  constructor(public topNavService: TopNavService, private route: ActivatedRoute, private authService: AuthService, private fcmMessageService: FcmMessageService) {
    this.tabsWithIcon = [
      { id: 0, name:'Home', route:'home', icon: 'home', level: 0},
      { id: 1, name:'Schedule', route:'schedule', icon: 'event', level: 0},
      { id: 2, name:'Announcements', route:'announcements', icon: 'comment', level: 0},
      { id: 2, name:'Coaches', route:'coaches', icon: 'group', level: 0}
    ];
  }

  ngOnInit() {
    const filter = this.route.snapshot.queryParamMap.get('filter');
    this.authService.getUser().pipe(take(1)).subscribe (user => {
      this.fcmMessageService.persistTokentoDB(user as AppUser);
    })

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
