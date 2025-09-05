import { BaseModel } from "./base.model";
import { BookModel } from "./book.model";

export class SeriesModel extends BaseModel {
  title?: string;
  imageUrl?: any;
  books?: BookModel[];
}
