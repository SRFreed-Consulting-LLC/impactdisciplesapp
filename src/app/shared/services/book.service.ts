import { Injectable } from "@angular/core"
import { BookModel } from "../models/book.model"
import { BaseService } from "./base.service"
import { FirebaseDAO } from "./firebase.dao"

@Injectable({
  providedIn: 'root'
})
export class BookService extends BaseService<BookModel> {
  constructor(public override dao: FirebaseDAO<BookModel>) {
    super(dao)
    this.table="books"
  }
}
