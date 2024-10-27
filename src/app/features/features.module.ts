import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DxAccordionModule, DxSchedulerModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { CoachesComponent } from './coaches/coaches.component';

@NgModule({
  declarations: [
    AnnouncementsComponent,
    HomeComponent,
    ScheduleComponent,
    CoachesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DxSchedulerModule,
    DxAccordionModule
  ]
})
export class FeaturesModule { }
