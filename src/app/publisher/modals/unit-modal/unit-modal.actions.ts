import { UnitModel } from "src/app/shared/models/unit.model";

export class UnitAddEditModal {
  static readonly type = '[Unit] Show Units Add/Edit Modal';
  constructor(public unit?: UnitModel){}
}
