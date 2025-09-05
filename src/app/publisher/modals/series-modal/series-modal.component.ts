import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { DxFormComponent } from 'devextreme-angular';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { SeriesModel } from 'src/app/shared/models/series.model';
import { SeriesService } from 'src/app/shared/services/series.service';
import { SeriesAddEditModal } from './series-modal.actions';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { BookService } from 'src/app/shared/services/book.service';
import { confirm } from 'devextreme/ui/dialog';
import { BookModel } from 'src/app/shared/models/book.model';
import { BookAddEditModal } from '../book-modal/book-modal.actions';


@Component({
  selector: 'app-series-modal',
  templateUrl: './series-modal.component.html',
  styleUrls: ['./series-modal.component.css']
})
export class SeriesModalComponent implements OnInit, OnDestroy {
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  datasource$: Observable<DataSource>;

  public series: SeriesModel = {};

  public inProgress$ = new BehaviorSubject<boolean>(false);
  public isVisible$ = new BehaviorSubject<boolean>(false);

  private ngUnsubscribe = new Subject<void>();

  constructor(private actions$: Actions,
    private seriesService: SeriesService,
    private bookService: BookService,
    private store: Store) {}

  ngOnInit(): void {
    this.actions$.pipe(ofActionDispatched(SeriesAddEditModal), takeUntil(this.ngUnsubscribe)).subscribe(({ series }) => {
      if(series) {
        this.series = series;
      }
      this.isVisible$.next(true)

      this.datasource$ = this.bookService.streamAllByValue('series', series.id).pipe(
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
    })


  }

  onSave(item: SeriesModel) {
    if(this.addEditForm.instance.validate().isValid) {
      this.inProgress$.next(true);

      if(item.id) {
        this.seriesService.update(item.id, item).then((item) => {
          if(item) {
            notify({
              message: 'Series Updated',
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
        this.seriesService.add(item).then((item) => {
          if(item) {
            notify({
              message: 'Series Added',
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


  showEditModal = (e?) => {
    let book: BookModel;
    if(e && e.data){
      book = e.data;
    } else {
      book = {... new BookModel()}
      book.series = this.series.id
    }
    this.store.dispatch(new BookAddEditModal(book));
  }

  deleteBook = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this record?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.bookService.delete(data.id).then(() => {
          notify({
            message: 'Series Deleted',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }


  onCancel() {
    this.series = {};
    this.inProgress$.next(false);
    this.isVisible$.next(false);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
