import { DataService } from './../../admin/data.service';
import { Component, OnInit } from '@angular/core';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { CoachService } from 'impactdisciplescommon/src/services/data/coach.service';
import { BehaviorSubject, forkJoin } from 'rxjs';

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

  constructor(private dataService: DataService,
    private coachService: CoachService,
  ){}

  async ngOnInit(): Promise<void> {
    this.event =  await this.dataService.getEvent();

    this.organizations = this.dataService.getOrganizations();

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
