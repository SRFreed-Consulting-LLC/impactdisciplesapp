import { Component, HostBinding } from '@angular/core';
import { AuthService } from 'impactdisciplescommon/src/app/shared/services/auth.service';
import { ScreenService } from 'impactdisciplescommon/src/app/shared/services/screen.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'impactdisciples';

  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService, private screen: ScreenService) { }

  isAuthenticated() {
    return this.authService.loggedIn;
  }
}
