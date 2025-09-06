import { BaseModel } from "impactdisciplescommon/src/models/base.model";
import { UnitModel } from "./unit.model";
import { LessonModel } from "./lesson.model";

export class BookModel extends BaseModel {
  title: string;
  series?: string;
  author?: string;
  year?: number;
  units?: UnitModel[];
  lessons?: LessonModel[];
}
