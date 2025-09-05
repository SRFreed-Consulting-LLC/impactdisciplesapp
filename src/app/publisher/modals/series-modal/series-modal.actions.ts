import { SeriesModel } from "src/app/shared/models/series.model";

export class SeriesAddEditModal {
  static readonly type = '[SERIES] Show Series Add/Edit Modal';
  constructor(public series?: SeriesModel){}
}
