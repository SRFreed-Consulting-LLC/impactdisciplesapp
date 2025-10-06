import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventRegistrationModel } from 'impactdisciplescommon/src/models/domain/event-registration.model';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { AuthService } from 'impactdisciplespwacommon/src/services/events/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  currentUser: EventRegistrationModel;

  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService ){}

  ngOnInit(): void {
    this.currentUser = this.authService.getLoggedInUser()
  }

  logout() {
    this.authService.logOut();
  }

  update(){
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
