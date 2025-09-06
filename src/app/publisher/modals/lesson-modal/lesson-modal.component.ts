import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { DxFormComponent } from 'devextreme-angular';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { LessonAddEditModal } from './lesson-modal.actions';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { LessonModel } from 'src/app/shared/models/lesson.model';
import { UnitModel } from 'src/app/shared/models/unit.model';
import { UnitService } from 'src/app/shared/services/unit.service';
import { FormioForm } from '@formio/angular';

@Component({
  selector: 'app-lesson-modal',
  templateUrl: './lesson-modal.component.html',
  styleUrls: ['./lesson-modal.component.css']
})
export class LessonModalComponent implements OnInit, OnDestroy {
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  lesson: LessonModel;
  unitList: UnitModel[];
  form: FormioForm;

  inProgress$ = new BehaviorSubject<boolean>(false);
  isVisible$ = new BehaviorSubject<boolean>(false);

  private ngUnsubscribe = new Subject<void>();

  constructor(private actions$: Actions,
    private unitService: UnitService,
    private service: LessonService) {}

  async ngOnInit(): Promise<void> {
    this.actions$.pipe(ofActionDispatched(LessonAddEditModal), takeUntil(this.ngUnsubscribe)).subscribe(({ lesson }) => {
      if(lesson) {
        this.lesson = lesson;

        if(lesson.form){
          this.form = JSON.parse(lesson?.form);
        }
      }
      this.isVisible$.next(true)
    })

    this.unitList = await this.unitService.getAll()
  }

  onSave(item: LessonModel) {
    if(this.addEditForm.instance.validate().isValid) {
      this.inProgress$.next(true);

      if(item.id) {
        this.service.update(item.id, item).then((item) => {
          if(item) {
            notify({
              message: 'Lesson Updated',
              position: 'top',
              width: 600,
              type: 'success'
            });
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
              message: 'Lesson Added',
              position: 'top',
              width: 600,
              type: 'success'
            });
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
