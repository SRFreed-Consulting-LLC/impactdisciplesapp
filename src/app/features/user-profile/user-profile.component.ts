import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  currentUser: CustomerModel;

  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService ){}

  ngOnInit(): void {
    this.authService.getUser().pipe(takeUntil(this.ngUnsubscribe)).subscribe((user) => {
      this.currentUser = user;
      console.log(user)
    })
  }

  logout() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
