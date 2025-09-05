import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxListModule, DxLookupModule, DxNumberBoxModule, DxPopupModule, DxToolbarModule, DxTreeViewModule } from 'devextreme-angular';
import { PublishingManagerComponent } from './publishing-manager/publishing-manager.component';
import { SharedModule } from '../shared/shared.module';
import { ImpactFormsModule } from 'impactdisciplescommon/src/forms/forms.module';
import { BookSeriesComponent } from './series-list/series-list.component';
import { UnitModalComponent } from './modals/unit-modal/unit-modal.component';
import { SeriesModalComponent } from './modals/series-modal/series-modal.component';
import { BookModalComponent } from './modals/book-modal/book-modal.component';
import { LessonModalComponent } from './modals/lesson-modal/lesson-modal.component';
import { FormioModule } from '@formio/angular';
import { LessonPreviewerComponent } from './lesson-previewer/lesson-previewer.component';


@NgModule({
  imports: [
    CommonModule,
    ImpactFormsModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxFormModule,
    DxTreeViewModule,
    DxLookupModule,
    SharedModule,
    FormioModule
  ],
  declarations: [
    PublishingManagerComponent,
    BookModalComponent,
    BookSeriesComponent,
    SeriesModalComponent,
    UnitModalComponent,
    LessonModalComponent,
    LessonPreviewerComponent
  ]
})
export class PublisherModule { }
