import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [
    AnnouncementsComponent,
    HomeComponent,
    ScheduleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule { }
