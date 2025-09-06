import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentData, onSnapshot, QueryConstraint, QuerySnapshot } from 'firebase/firestore';
import { Unsubscribe } from 'firebase/auth';
import { BaseModel } from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDAO<T extends BaseModel> {

  constructor(public fs: Firestore ) {}

  public getAll(table: string, fromFirestore?): Promise<T[]>{
    return getDocs(collection(this.fs, '/' + table)).then(docs => {
      return this.getDocListFromPromise(docs, fromFirestore);
    });
  }

  public getAllByValue(table: string, field: string, value: any, fromFirestore?): Promise<T[]>{
    return getDocs(query(collection(this.fs, '/' + table), where(field, "==", value))).then(docs => {
      return this.getDocListFromPromise(docs, fromFirestore);
    });
  }

  public queryByValue(table: string, field: string, opStr: WhereFilterOperandKeys, value: any, fromFirestore?): Promise<T[]>{
    return getDocs(query(collection(this.fs, '/' + table), where(field, opStr, value))).then(docs => {
      return this.getDocListFromPromise(docs, fromFirestore);
    });
  }

  public queryAllByMultiValue(table: string, queries: QueryParam[], fromFirestore?): Promise<T[]>{
    const queryConstraints: QueryConstraint[] = queries.map((query) =>
      where(query.field, query.operation, query.value),
    );

    return getDocs(query(collection(this.fs, '/' + table), ...queryConstraints)).then(docs => {
      return this.getDocListFromPromise(docs, fromFirestore);
    });
  }

  public getById(id: string, table: string, fromFirestore?): Promise<T>{
    return getDoc(doc(this.fs, '/' + table + '/' + id)).then(async doc => {
      if(doc.exists()){
        let retval: T = doc.data() as T;
        retval.id = doc.id;
        return fromFirestore? fromFirestore(retval) : retval;
      }
    })
  }

  public add(value: T, table: string, fromFirestore?): Promise<T>{
    return addDoc(collection(this.fs, '/' + table), value).then(async doc => {
      let retval = await this.getById(doc.id, table, fromFirestore);
      retval.id = doc.id;
      return retval;
    });
  }

  public async update(id: string, value: T, table: string, fromFirestore?): Promise<T>{
    await setDoc(doc(this.fs, '/' + table + '/' + id), value).then(async () => {
      let retval = await this.getById(id, table, fromFirestore);
      retval.id = id;
      return retval;
    });

    return this.getById(id, table, fromFirestore);
  }

  public delete(id: string, table: string){
    return deleteDoc(doc(this.fs, '/' + table + '/' + id));
  }

  public streamAll(table: string, fromFirestore?): Observable<T[]>{
    return collectionData(collection(this.fs, '/' + table), {idField: 'id'}).pipe(
      map(docs => {
        return this.getDocListFromStream(docs, fromFirestore);
      })
    );
  }

  public streamByValue(table: string, field: string, value: any, fromFirestore?): Observable<T[]>{
    return collectionData(query(collection(this.fs, '/' + table), where(field, "==", value)), {idField: 'id'}).pipe(
      map(docs => {
        return this.getDocListFromStream(docs, fromFirestore);
      })
    );
  }

  public streamById(id: string, table: string, callBack, fromFirestore?): Unsubscribe{
    return onSnapshot(doc(this.fs, '/' + table + '/' + id), async doc => {
      if(doc.exists()){
        let retval: T = doc.data() as T;
        retval.id = doc.id;
        retval = fromFirestore? fromFirestore(retval) : retval;
        console.log(retval);
        callBack(retval);
      }
    })
  }

  public queryStreamByValue(table: string, field: string, opStr: WhereFilterOperandKeys, value: any, fromFirestore?): Observable<T[]>{
    return collectionData(query(collection(this.fs, '/' + table), where(field, opStr, value)), {idField: 'id'}).pipe(
      map(docs => {
        return this.getDocListFromStream(docs, fromFirestore);
      })
    );
  }

  public queryAllStreamByMultiValue(table: string, queries: QueryParam[], fromFirestore?): Observable<T[]>{
    const queryConstraints: QueryConstraint[] = queries.map((query) =>
      where(query.field, query.operation, query.value),
    );

    return collectionData(query(collection(this.fs, '/' + table), ...queryConstraints), {idField: 'id'}).pipe(
      map(docs => {
        return this.getDocListFromStream(docs, fromFirestore);
      })
    );
  }

  public async createInSubcollection(value: T, table: string, record_id: string, subcollection: string, fromFirestore?): Promise<T> {
    const snap = await addDoc(collection(this.fs, table, record_id, subcollection), value);

    return this.getById(table, snap.id, fromFirestore);
  }

  public async getAllFromSubCollection(table: string, record_id: string, subcollection: string, fromFirestore?): Promise<T[]> {
    const snap = await getDocs(collection(this.fs, table, record_id, subcollection));

    const docsData = snap.docs.map((item) => (item.exists() ? item.data() as T : null));

    return docsData;
  }

  private getDocListFromStream(docs: (DocumentData | (DocumentData & {id: string}))[], fromFirestore){
    let retval: T[] = [];

    docs.forEach(doc => {
      let val: T = doc as T;
      val.id = doc.id;
      retval.push(fromFirestore? fromFirestore(val) :val);
    })

    return retval;
  }

  private getDocListFromPromise(docs: QuerySnapshot<DocumentData, DocumentData>, fromFirestore){
    let retval: T[] = [];

    docs.forEach(doc => {
      let val: T = doc.data() as T;
      val.id = doc.id;
      retval.push(fromFirestore? fromFirestore(val) :val);
    })

    return retval;
  }

  private getDoc(doc: (DocumentData | (DocumentData & {id: string})), fromFirestore){
    let val: T = doc as T;
    val.id = doc.id;
    return fromFirestore? fromFirestore(val) : val;
  }
}




export enum WhereFilterOperandKeys {
  less = '<',
  lessOrEqual = '<=',
  equal = '==',
  notEqual = '!=',
  more = '>',
  moreOrEqual = '>=',
  arrayContains = 'array-contains',
  in = 'in',
  arrayContainsAny = 'array-contains-any',
  notIn = 'not-in',
}

export class QueryParam {
  constructor(field: string, operation: WhereFilterOperandKeys, value: any) {
    this.field = field;
    this.operation = operation;
    this.value = value;
  }
  field: string;
  value: any;
  operation: WhereFilterOperandKeys;
}
