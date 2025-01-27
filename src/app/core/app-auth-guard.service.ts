import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

const COOKIE_NAME = "impact-disciples-user"

@Injectable({
  providedIn: 'root'
})
//TODO: See why CanActivate is deprecated and update
export class AppAuthGuardService implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) { }

  canActivate(): boolean {
    const cookieValue = this.cookieService.get(COOKIE_NAME);

    if(!cookieValue){
      this.router.navigate(['capture-username-form']);
      return false;
    } else {
      return true;
    }

  }
}
