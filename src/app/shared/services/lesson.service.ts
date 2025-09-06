import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FirebaseDAO } from './firebase.dao';
import { LessonModel } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService extends BaseService<LessonModel>{
  constructor(public override dao: FirebaseDAO<LessonModel>) {
    super(dao)
    this.table="lessons"
  }
}
