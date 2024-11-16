import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DxAccordionModule, DxButtonModule, DxPopupModule, DxSchedulerModule, DxTabsModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { CoachesComponent } from './coaches/coaches.component';
import { FormsModule } from '@angular/forms';
import { FaqComponent } from './home/faq/faq.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { SessionsScheduleComponent } from './schedule/sessions-schedule/sessions-schedule.component';
import { MyScheduleComponent } from './schedule/my-schedule/my-schedule.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AnnouncementsComponent,
    HomeComponent,
    ScheduleComponent,
    CoachesComponent,
    FaqComponent,
    WelcomeComponent,
    SessionsScheduleComponent,
    MyScheduleComponent,
    UserProfileComponent
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
