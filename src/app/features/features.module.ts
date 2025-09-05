import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxAccordionModule, DxButtonModule, DxLoadIndicatorModule, DxPopupModule, DxSchedulerModule, DxTabsModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PrivatePolicyComponent } from './private-policy/private-policy.component';
import { FormioModule } from '@formio/angular';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    UserProfileComponent,
    PrivatePolicyComponent
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
    SharedModule,
    FormioModule
  ]
})
export class FeaturesModule { }
