import { NgModule } from '@angular/core';
import { DxGalleryModule } from 'devextreme-angular';
import { LocationPipe } from './pipes/location.pipe';

@NgModule({
  declarations: [
    LocationPipe
  ],
  imports: [
    DxGalleryModule
  ],
  exports: [
    DxGalleryModule,
    LocationPipe
  ]
})
export class SharedModule { }
