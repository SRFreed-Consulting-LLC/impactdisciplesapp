import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ScheduleComponent } from './features/schedule/schedule.component';
import { AnnouncementsComponent } from './features/announcements/announcements.component';
import { MainComponent } from './core/main/main.component';
import { CoachesComponent } from './features/coaches/coaches.component';
import { AppAuthGuardService } from './core/app-auth-guard.service';
import { EventSelectorComponent } from './core/event-selector/event-selector.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { OnArrivalComponent } from './features/on-arrival/on-arrival.component';
import { DiningComponent } from './features/dining/dining.component';
import { FaqComponent } from './features/faq/faq.component';
import { PrivatePolicyComponent } from './features/private-policy/private-policy.component';
import { InstallComponent } from './core/install/install.component';
import { MapComponent } from './features/map/map.component';
import { CaptureUsernameFormComponent } from 'impactdisciplespwacommon/src/forms/events/capture-username-form/capture-username-form.component';
import { AuthGuardService } from 'impactdisciplespwacommon/src/services/events/auth.service';

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
        path: 'map',
        component: MapComponent
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
    path: 'install',
    component: InstallComponent
  },
  {
    path: 'event-selector',
    component: EventSelectorComponent
  },
  {
    path: 'capture-username-form',
    component: CaptureUsernameFormComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
