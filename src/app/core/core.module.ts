import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxDropDownButtonModule, DxTabsModule, DxToolbarModule } from 'devextreme-angular';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxTabsModule,
    DxToolbarModule,
    DxDropDownButtonModule
  ],
  declarations: [
    MainComponent
  ]
})
export class CoreModule { }
