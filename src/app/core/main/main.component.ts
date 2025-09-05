import { Component, OnInit } from '@angular/core';
import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  menuItems: string[] = ['Log Off'];

  constructor(private authService: AuthService,) {}
  ngOnInit() {
  }

  onMenuItemClick(e: DxDropDownButtonTypes.ItemClickEvent): void {
    if(e.itemData == 'Log Off'){
      this.authService.logOut();
    }
  }
}
