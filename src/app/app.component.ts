import { Component, HostBinding, OnInit } from '@angular/core';
import { FcmMessageService } from 'impactdisciplescommon/src/services/utils/FCMMessageService.service';
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

  constructor(private screen: ScreenService, private fcmMessageService: FcmMessageService) { }

  ngOnInit(): void {
    this.fcmMessageService.checkNotificationsSetup();
  }

}

