import { Component, OnInit } from '@angular/core';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { CoachService } from 'impactdisciplescommon/src/services/data/coach.service';
import { EventService } from 'impactdisciplescommon/src/services/data/event.service';
import { OrganizationService } from 'impactdisciplescommon/src/services/data/organization.service';
import { SessionService } from 'impactdisciplescommon/src/services/utils/session.service';
import { BehaviorSubject, forkJoin, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit{
  event: EventModel;
  coaches: CoachModel[];
  selectedCoach: CoachModel;
  organizations: OrganizationModel[];

  public isVisible$ = new BehaviorSubject<boolean>(false);

  private ngUnsubscribe = new Subject<void>();

  constructor(private coachService: CoachService,
    private organizationService: OrganizationService,
    private eventService: EventService,
    private sessionService: SessionService
  ){}

  async ngOnInit(): Promise<void> {
    this.eventService.streamAllByValue('id', await this.sessionService.getCurrentEventId()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(async events => {
      this.event = events[0];

      this.organizations = await this.organizationService.getAll();

      const coachIds = Array.from(
        new Set(
          this.event.agendaItems.flatMap(item => item.coaches || [])
        )
      );

      if (coachIds.length > 0) {
        const coachObservables = coachIds.map(id => this.coachService.getById(id));

        forkJoin(coachObservables).subscribe((coaches) => {
          this.coaches = coaches.sort((a, b) => a.sortOrder - b.sortOrder)
        });
      }
    });
  }

  viewCoach(coach: CoachModel){
    this.selectedCoach = coach;

    this.isVisible$.next(true);
  }

  onCancel(){
    this.isVisible$.next(false);
  }

  getOrganization(coach: CoachModel){
    if(coach.organization){
      let organization = this.organizations.find(organization => organization.id == coach.organization);
      if(organization){
        return organization.name
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}
