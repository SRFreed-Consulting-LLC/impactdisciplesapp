import { DataService } from './../../admin/data.service';
import { Component, OnInit } from '@angular/core';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { CoachService } from 'impactdisciplescommon/src/services/data/coach.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit{
  event: EventModel;
  coaches: CoachModel[] = [];

  constructor(private dataService: DataService,
    private coachService: CoachService
  ){}

  async ngOnInit(): Promise<void> {
    this.event =  await this.dataService.event;

    const coachIds = Array.from(
      new Set(
        this.event.agendaItems.flatMap(item => item.coaches || [])
      )
    );

    if (coachIds.length > 0) {
      const coachObservables = coachIds.map(id => this.coachService.getById(id));

      forkJoin(coachObservables).subscribe((coaches) => {
        this.coaches = coaches;
      });
    }
  }
}
