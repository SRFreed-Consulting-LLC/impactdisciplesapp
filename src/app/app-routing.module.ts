import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ScheduleComponent } from './features/schedule/schedule.component';
import { AnnouncementsComponent } from './features/announcements/announcements.component';
import { CapturePasswordFormComponent } from 'impactdisciplescommon/src/forms/capture-password-form/capture-password-form.component';
import { CaptureUsernameFormComponent } from 'impactdisciplescommon/src/forms/capture-username-form/capture-username-form.component';
import { ChangePasswordFormComponent } from 'impactdisciplescommon/src/forms/change-password-form/change-password-form.component';
import { CreateAuthFormComponent } from 'impactdisciplescommon/src/forms/create-auth-form/create-auth-form.component';
import { ResetPasswordFormComponent } from 'impactdisciplescommon/src/forms/reset-password-form/reset-password-form.component';
import { MainComponent } from './core/main/main.component';
import { AuthGuardService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { CoachesComponent } from './features/coaches/coaches.component';
import { AppAuthGuardService } from './core/app-auth-guard.service';
import { EventSelectorComponent } from './core/event-selector/event-selector.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { OnArrivalComponent } from './features/on-arrival/on-arrival.component';
import { DiningComponent } from './features/dining/dining.component';
import { FaqComponent } from './features/faq/faq.component';
import { PrivatePolicyComponent } from './features/private-policy/private-policy.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [ AppAuthGuardService ],
    children: [
      {
        path: '',
        component: CaptureUsernameFormComponent,
        canActivate: [ AuthGuardService ]
      },
      {
        path: 'announcements',
        component: AnnouncementsComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'schedule',
        component: ScheduleComponent
      },
      {
        path: 'coaches',
        component: CoachesComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      },
      {
        path: 'on-arrival',
        component: OnArrivalComponent
      },
      {
        path: 'dining',
        component: DiningComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'policy',
        component: PrivatePolicyComponent
      },
    ]
  },
  {
    path: 'event-selector',
    component: EventSelectorComponent
  }, 
  {
    path: 'capture-username-form',
    component: CaptureUsernameFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'capture-password-form',
    component: CapturePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-auth-form',
    component: CreateAuthFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
