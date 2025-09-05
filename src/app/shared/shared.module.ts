import { NgModule } from '@angular/core';
import { DxButtonModule, DxGalleryModule, DxLoadIndicatorModule } from 'devextreme-angular';
import { LocationPipe } from './pipes/location.pipe';
import { IndicatorButtonComponent } from './indicator-button/indicator-button.component';

@NgModule({
  declarations: [
    LocationPipe,
    IndicatorButtonComponent
  ],
  imports: [
    DxGalleryModule,
    DxButtonModule,
    DxLoadIndicatorModule
  ],
  exports: [
    DxGalleryModule,
    LocationPipe,
    IndicatorButtonComponent
  ]
})
export class SharedModule { }
