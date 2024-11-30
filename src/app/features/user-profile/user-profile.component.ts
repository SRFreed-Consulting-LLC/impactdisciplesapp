import { Component } from '@angular/core';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  constructor(private authService: AuthService){}

  logout() {
    this.authService.logOut();
  }

}
