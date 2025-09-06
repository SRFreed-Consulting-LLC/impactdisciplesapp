import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { SeriesModel } from '../models/series.model';
import { FirebaseDAO } from './firebase.dao';

@Injectable({
  providedIn: 'root'
})
export class SeriesService extends BaseService<SeriesModel>{
  constructor(public override dao: FirebaseDAO<SeriesModel>) {
    super(dao)
    this.table="series"
  }
}
