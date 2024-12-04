import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DxAccordionModule, DxButtonModule, DxPopupModule, DxSchedulerModule, DxTabsModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { CoachesComponent } from './coaches/coaches.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { SessionsScheduleComponent } from './schedule/sessions-schedule/sessions-schedule.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OnArrivalComponent } from './on-arrival/on-arrival.component';
import { DiningComponent } from './dining/dining.component';
import { FaqComponent } from './faq/faq.component';
import { PrivatePolicyComponent } from './private-policy/private-policy.component';
import { MySessionsComponent } from './schedule/my-sessions/my-sessions.component';

@NgModule({
  declarations: [
    AnnouncementsComponent,
    HomeComponent,
    ScheduleComponent,
    CoachesComponent,
    WelcomeComponent,
    SessionsScheduleComponent,
    MySessionsComponent,
    UserProfileComponent,
    OnArrivalComponent,
    DiningComponent,
    FaqComponent,
    PrivatePolicyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DxButtonModule,
    DxSchedulerModule,
    DxAccordionModule,
    DxPopupModule,
    DxTabsModule,
    SharedModule
  ]
})
export class FeaturesModule { }
