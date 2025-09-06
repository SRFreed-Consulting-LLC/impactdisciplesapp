import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { DxFormComponent } from 'devextreme-angular';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { BookModel } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/shared/services/book.service';
import { SeriesModel } from 'src/app/shared/models/series.model';
import { SeriesService } from 'src/app/shared/services/series.service';
import { BookAddEditModal } from './book-modal.actions';
import DataSource from 'devextreme/data/data_source';
import { UnitService } from 'src/app/shared/services/unit.service';
import CustomStore from 'devextreme/data/custom_store';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { confirm } from 'devextreme/ui/dialog';
import { UnitModel } from 'src/app/shared/models/unit.model';
import { LessonModel } from 'src/app/shared/models/lesson.model';
import { UnitAddEditModal } from '../unit-modal/unit-modal.actions';
import { LessonAddEditModal } from '../lesson-modal/lesson-modal.actions';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit, OnDestroy {
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  unitsDatasource$: Observable<DataSource>;
  lessonsDatasource$: Observable<DataSource>;

  book: BookModel;

  seriesList: SeriesModel[];
  unitsList: UnitModel[]

  public inProgress$ = new BehaviorSubject<boolean>(false);
  public isVisible$ = new BehaviorSubject<boolean>(false);

  private ngUnsubscribe = new Subject<void>();

  constructor(private actions$: Actions,
    private store: Store,
    private service: BookService,
    private seriesService: SeriesService,
    private unitService: UnitService,
    private lessonsService: LessonService) {}

  async ngOnInit(): Promise<void> {
    this.actions$.pipe(ofActionDispatched(BookAddEditModal), takeUntil(this.ngUnsubscribe)).subscribe(({ book }) => {
      if(book) {
        this.book = book;
      }

      this.unitsDatasource$ = this.unitService.streamAllByValue('book', this.book.id).pipe(
        map(
          (items) =>
            new DataSource({
              reshapeOnPush: true,
              pushAggregationTimeout: 100,
              store: new CustomStore({
                key: 'id',
                loadMode: 'raw',
                load: function (loadOptions: any) {
                  return items;
                }
              })
            })
        )
      );

      this.lessonsDatasource$ = this.lessonsService.streamAllByValue('book', this.book.id).pipe(
        map(
          (items) =>
            new DataSource({
              reshapeOnPush: true,
              pushAggregationTimeout: 100,
              store: new CustomStore({
                key: 'id',
                loadMode: 'raw',
                load: function (loadOptions: any) {
                  return items;
                }
              })
            })
        )
      );

      this.isVisible$.next(true)
    })

    this.seriesList = await this.seriesService.getAll()
    this.unitsList = await this.unitService.getAll()
  }

  onSave(item: BookModel) {
    if(this.addEditForm.instance.validate().isValid) {
      this.inProgress$.next(true);

      if(item.id) {
        this.service.update(item.id, item).then((item) => {
          if(item) {
            notify({
              message: 'Book Updated',
              position: 'top',
              width: 600,
              type: 'success'
            });
            this.onCancel();
          } else {
            this.inProgress$.next(false);
            notify({
              message: 'Some Error Occured',
              position: 'top',
              width: 600,
              type: 'success'
            });
          }
        })
      } else {
        this.service.add(item).then((item) => {
          if(item) {
            notify({
              message: 'Book Added',
              position: 'top',
              width: 600,
              type: 'success'
            });
            this.onCancel();
          } else {
            this.inProgress$.next(false);
            notify({
              message: 'Some Error Occured',
              position: 'top',
              width: 600,
              type: 'error'
            });
          }
        })
      }
    }
  }

  showUnitEditModal = (e?) => {
    let unit: UnitModel;
    if(e && e.data){
      unit = e.data;
    } else {
      unit = {... new BookModel()}
      unit.book = this.book.id
    }

    this.store.dispatch(new UnitAddEditModal(unit));
  }

  deleteUnit = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this record?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.unitService.delete(data.id).then(() => {
          notify({
            message: 'Unit Deleted',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }

  showLessonEditModal = (e?) => {
    let lesson: LessonModel;
    if(e && e.data){
      lesson = e.data;
    } else {
      lesson = {... new LessonModel()}
      lesson.book = this.book.id
    }
    this.store.dispatch(new LessonAddEditModal(lesson));
  }

  deleteLesson = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this record?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.lessonsService.delete(data.id).then(() => {
          notify({
            message: 'Lesson Deleted',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }

  onCancel() {
    this.book = null;
    this.inProgress$.next(false);
    this.isVisible$.next(false);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
