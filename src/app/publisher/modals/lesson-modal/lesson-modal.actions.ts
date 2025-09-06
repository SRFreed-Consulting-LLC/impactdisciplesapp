import { LessonModel } from "src/app/shared/models/lesson.model";

export class LessonAddEditModal {
  static readonly type = '[Lesson] Show Lessons Add/Edit Modal';
  constructor(public lesson?: LessonModel){}
}
