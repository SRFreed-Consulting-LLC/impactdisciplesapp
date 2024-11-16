import { NgModule } from '@angular/core';
import { DxGalleryModule } from 'devextreme-angular';

@NgModule({
  imports: [
    DxGalleryModule
  ],
  exports: [
    DxGalleryModule
  ]
})
export class SharedModule { }
