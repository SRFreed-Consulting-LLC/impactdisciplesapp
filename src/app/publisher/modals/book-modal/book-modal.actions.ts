import { BookModel } from "src/app/shared/models/book.model";

export class BookAddEditModal {
  static readonly type = '[BOOK] Show Book Add/Edit Modal';
  constructor(public book?: BookModel){}
}
