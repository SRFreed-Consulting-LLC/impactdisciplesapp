import { Injectable } from '@angular/core';
import { getFirestore, Unsubscribe } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { BaseModel } from '../models/base.model';
import { FirebaseDAO, QueryParam, WhereFilterOperandKeys } from './firebase.dao';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends BaseModel> {
  public table: string = '';
  public fromFirestore;

  constructor(public dao: FirebaseDAO<T>) {
    dao.fs = getFirestore("impactdiscipleship-books")
  }

  getAll(): Promise<T[]>{
    return this.dao.getAll(this.table, this.fromFirestore);
  }

  getAllByValue(field: string, value: any): Promise<T[]>{
    return this.dao.getAllByValue(this.table, field, value, this.fromFirestore);
  }

  queryAllByValue(field: string, opStr: WhereFilterOperandKeys, value: any): Promise<T[]>{
    return this.dao.queryByValue(this.table, field, opStr, value, this.fromFirestore);
  }

  queryAllByMultiValue(queries: QueryParam[]): Promise<T[]>{
    return this.dao.queryAllByMultiValue(this.table, queries, this.fromFirestore)
  }

  getById(id: string): Promise<T>{
    return this.dao.getById(id, this.table, this.fromFirestore);
  }

  streamAll(): Observable<T[]>{
    return this.dao.streamAll(this.table, this.fromFirestore)
  }

  streamAllByValue(field: string, value: any): Observable<T[]>{
    return this.dao.streamByValue(this.table, field, value, this.fromFirestore)
  }

  streamById(id: string): Observable<T[]>{
    return this.dao.streamByValue(this.table, 'id', id, this.fromFirestore);
  }

  streamRecord(id: string, callBack): Unsubscribe{
    return this.dao.streamById(id, this.table, callBack, this.fromFirestore);
  }

  queryStreamByValue(field: any, opStr: WhereFilterOperandKeys, value: string): Observable<T[]>{
    return this.dao.queryStreamByValue(this.table, field, opStr, value, this.fromFirestore);
  }

  queryAllStreamByMultiValue(queries: QueryParam[]): Observable<T[]>{
    return this.dao.queryAllStreamByMultiValue(this.table, queries, this.fromFirestore);
  }

  add(value: T): Promise<T>{
    return this.dao.add(value, this.table, this.fromFirestore);
  }

  update(id: string, value: T): Promise<T>{
    return this.dao.update(id, value, this.table, this.fromFirestore);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }

  createInSubcollection(value: T, record_id: string, subcollection: string): Promise<T>{
    return this.dao.createInSubcollection(value, this.table, record_id, subcollection, this.fromFirestore);
  }

  getAllFromSubCollection(record_id: string, subcollection: string): Promise<T[]> {
    return this.dao.getAllFromSubCollection(this.table, record_id, subcollection, this.fromFirestore);
  }
}
