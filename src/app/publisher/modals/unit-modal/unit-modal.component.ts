import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { DxFormComponent } from 'devextreme-angular';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { UnitModel } from 'src/app/shared/models/unit.model';
import { UnitAddEditModal } from './unit-modal.actions';
import { UnitService } from 'src/app/shared/services/unit.service';

@Component({
  selector: 'app-unit-modal',
  templateUrl: './unit-modal.component.html',
  styleUrls: ['./unit-modal.component.css']
})
export class UnitModalComponent implements OnInit, OnDestroy {
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  public unit: UnitModel;

  public inProgress$ = new BehaviorSubject<boolean>(false);
  public isVisible$ = new BehaviorSubject<boolean>(false);

  private ngUnsubscribe = new Subject<void>();

  constructor(private actions$: Actions, private service: UnitService) {}

  ngOnInit(): void {
    this.actions$.pipe(ofActionDispatched(UnitAddEditModal), takeUntil(this.ngUnsubscribe)).subscribe(({ unit }) => {
      if(unit) {
        this.unit = unit;
      }
      this.isVisible$.next(true)
    })
  }

  onSave(item: UnitModel) {
    if(this.addEditForm.instance.validate().isValid) {
      this.inProgress$.next(true);

      if(item.id) {
        this.service.update(item.id, item).then((item) => {
          if(item) {
            notify({
              message: 'Unit Updated',
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
              message: 'Unit Added',
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

  onCancel() {
    this.inProgress$.next(false);
    this.isVisible$.next(false);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
