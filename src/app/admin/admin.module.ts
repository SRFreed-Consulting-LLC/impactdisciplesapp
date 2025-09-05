import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule } from 'devextreme-angular';
import { LogMessagesComponent } from './log-messages/log-messages.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { ImpactFormsModule } from 'impactdisciplescommon/src/forms/forms.module';

@NgModule({
  imports: [
    CommonModule,
    ImpactFormsModule,
    DxDataGridModule,
    SharedModule
  ],
  declarations: [
    LogMessagesComponent,
    UsersComponent,
  ]
})
export class AdminModule { }
