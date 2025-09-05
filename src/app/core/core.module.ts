import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxAccordionModule, DxButtonModule, DxDropDownButtonModule, DxLoadIndicatorModule, DxTabsModule, DxToolbarModule } from 'devextreme-angular';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { InstallComponent } from './install/install.component';

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    RouterModule,
    DxLoadIndicatorModule,
    DxTabsModule,
    DxToolbarModule,
    DxDropDownButtonModule,
    DxAccordionModule
  ],
  declarations: [
    InstallComponent,
    MainComponent
  ]
})
export class CoreModule { }
