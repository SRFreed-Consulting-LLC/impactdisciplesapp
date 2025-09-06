import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DxAccordionModule, DxButtonModule, DxLoadIndicatorModule, DxPopupModule, DxSchedulerModule, DxTabsModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { CoachesComponent } from './coaches/coaches.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OnArrivalComponent } from './on-arrival/on-arrival.component';
import { DiningComponent } from './dining/dining.component';
import { FaqComponent } from './faq/faq.component';
import { PrivatePolicyComponent } from './private-policy/private-policy.component';
import { CourseModalComponent } from './schedule/course-modal/course-modal.component';
import { BreakoutSessionsComponent } from './schedule/breakout-sessions/breakout-sessions.component';
import { MyScheduleComponent } from './schedule/my-schedule/my-schedule.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AnnouncementsComponent,
    HomeComponent,
    ScheduleComponent,
    CoachesComponent,
    WelcomeComponent,
    MyScheduleComponent,
    BreakoutSessionsComponent,
    UserProfileComponent,
    OnArrivalComponent,
    DiningComponent,
    FaqComponent,
    PrivatePolicyComponent,
    CourseModalComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DxButtonModule,
    DxSchedulerModule,
    DxAccordionModule,
    DxLoadIndicatorModule,
    DxPopupModule,
    DxTabsModule,
    SharedModule
  ]
})
export class FeaturesModule { }
