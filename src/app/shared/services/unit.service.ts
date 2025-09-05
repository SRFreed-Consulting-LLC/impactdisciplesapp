import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FirebaseDAO } from './firebase.dao';
import { UnitModel } from '../models/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends BaseService<UnitModel>{
  constructor(public override dao: FirebaseDAO<UnitModel>) {
    super(dao)
    this.table="units"
  }
}
