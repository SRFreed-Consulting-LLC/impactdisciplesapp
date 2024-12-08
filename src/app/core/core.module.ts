import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxAccordionModule, DxButtonModule, DxDropDownButtonModule, DxTabsModule, DxToolbarModule } from 'devextreme-angular';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { EventSelectorComponent } from './event-selector/event-selector.component';

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    RouterModule,
    DxTabsModule,
    DxToolbarModule,
    DxDropDownButtonModule,
    DxAccordionModule
  ],
  declarations: [
    MainComponent,
    EventSelectorComponent
  ]
})
export class CoreModule { }
