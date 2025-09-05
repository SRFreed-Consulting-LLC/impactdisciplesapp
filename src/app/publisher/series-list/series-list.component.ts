import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { SeriesService } from 'src/app/shared/services/series.service';
import { ShowBookSeriesListModal } from './series-list-modal.actions';
import { SeriesAddEditModal } from '../modals/series-modal/series-modal.actions';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class BookSeriesComponent implements OnInit, OnDestroy {
  datasource$: Observable<DataSource>;

  public isVisible$ = new BehaviorSubject<boolean>(false);

  private ngUnsubscribe = new Subject<void>();

  constructor(private service: SeriesService, private store: Store, private actions$: Actions) {}

  ngOnInit(): void {
    this.actions$.pipe(ofActionDispatched(ShowBookSeriesListModal), takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.isVisible$.next(true)
    })

    this.datasource$ = this.service.streamAll().pipe(
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
  }

  showEditModal = (e) => {
    this.store.dispatch(new SeriesAddEditModal(e.data));
  }

  showSeriesAddModal = () => {
    this.store.dispatch(new SeriesAddEditModal());
  }

  delete = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this record?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.service.delete(data.id).then(() => {
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
    this.isVisible$.next(false);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
