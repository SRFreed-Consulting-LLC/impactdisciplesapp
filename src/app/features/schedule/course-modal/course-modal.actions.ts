import { CourseModel } from "impactdisciplescommon/src/models/domain/course.model";
import { EventModel } from "impactdisciplescommon/src/models/domain/event.model";
import { AgendaItem } from "impactdisciplescommon/src/models/domain/utils/agenda-item.model";
import { CustomerModel } from "impactdisciplescommon/src/models/domain/utils/customer.model";

export class ShowCourseModal {
  static readonly type = '[COURSE MODAL] Show Course Modal';
  constructor(public customAgendaItem: any, public course: CourseModel, public currentUser: CustomerModel, public event: EventModel){}
}