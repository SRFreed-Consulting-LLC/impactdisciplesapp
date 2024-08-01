import { Injectable, OnInit } from "@angular/core";
import { Messaging, getToken, onMessage, deleteToken } from "@angular/fire/messaging";
import { AppUser } from "impactdisciplescommon/src/models/admin/appuser.model";
import { NotificationRegistrationModel } from "impactdisciplescommon/src/models/admin/notification-registration.model";
import { NotificationRegistrationService } from "impactdisciplescommon/src/services/admin/notification-registration.service";
import { AuthService } from "impactdisciplescommon/src/services/utils/auth.service";
import { ToastrService } from "ngx-toastr";
import { take } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FcmMessageService {
  constructor(private messaging: Messaging, private toastrService: ToastrService,
    private authService: AuthService, private notificationRegistrationService: NotificationRegistrationService){}

  checkNotificationsSetup(){

    this.authService.getUser().pipe(take(1)).subscribe(async user => {
      console.log(user.email + " perms=" + Notification.permission)

      if(Notification.permission != 'granted'){
        this.validateAndRegisterUser(user)
      } else {
        this.setupNotificationListener(user);
      }
    });

  }

  setupNotificationListener(user: AppUser){
    navigator.serviceWorker.register("firebase-messaging-sw.js", { type: 'module'}).then((serviceWorkerRegistration) => {
      let val =  {
        vapidKey: 'BA7LQNkyXTlmgpoC_YX2okUq2LkSXb_6HogSTje_vWteRH9LSVWbHnBwYx-WJ1PO6ryyg0xB_v3B2PGBFN0namY',
        serviceWorkerRegistration: serviceWorkerRegistration,
      };

      getToken(this.messaging, val).then(async (x) => {
        console.log('my fcm token', x);
        if(user){
          let registrations: NotificationRegistrationModel[] = await this.notificationRegistrationService.getAllByValue('email', user.email);

          let found = registrations[0];

          if(found){
            found.fcmId = x;
            found.dateRegistered = new Date();

            this.notificationRegistrationService.update(found.id, found).then(reg => console.log("updated reg for " + reg.email));
          } else {
            found = new NotificationRegistrationModel();

            found.email = this.authService.user.email;
            found.fcmId = x;
            found.dateRegistered = new Date();

            this.notificationRegistrationService.add({...found}).then(reg => console.log("added reg for " + reg.email));;
          }
        }
      });
    }).catch(err => console.error(err));

    onMessage(this.messaging, (msg) => {
      this.toastrService.show(msg.notification.title, msg.notification.body);
      console.log("My Firebase Cloud Message", msg);
    });

    deleteToken(this.messaging).then(async msg => {
      console.log("My Firebase Cloud Message deleted", msg);

      let registration: NotificationRegistrationModel[] = await this.notificationRegistrationService.getAllByValue('email', this.authService.user.email);

      let found = registration[0];

      if(found){
        this.notificationRegistrationService.delete(found.id);
      }
    });
  }

  validateAndRegisterUser(user: AppUser){
    Notification.requestPermission().then((notificationPermissions: NotificationPermission) => {
      if (notificationPermissions === "granted") {
        console.log("Granted");

        this.setupNotificationListener(user);
      }
      if (notificationPermissions === "denied") {
        console.log("Denied");
      }


    });
  }
}

