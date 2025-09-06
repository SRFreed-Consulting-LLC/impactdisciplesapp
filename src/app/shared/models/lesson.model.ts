import { BaseModel } from "./base.model";

export class LessonModel extends BaseModel {
  title: string;
  form?: string;
  book: string;
  unit: string;
  order: number;
}
