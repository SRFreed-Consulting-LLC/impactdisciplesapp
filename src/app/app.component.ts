import { Component, HostBinding, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FcmMessageService } from 'impactdisciplescommon/src/services/admin/FCMMessageService.service';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { ScreenService } from 'impactdisciplescommon/src/services/utils/screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'impactdisciples';

  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService, private screen: ScreenService, public fs: Firestore, private fcmMessageService: FcmMessageService) { }

  ngOnInit(): void {
    this.fcmMessageService.checkNotificationsSetup();
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }
}

