import { Component, Input, OnInit } from '@angular/core';
import { LessonModel } from 'src/app/shared/models/lesson.model';

@Component({
  selector: 'app-lesson-builder',
  templateUrl: './lesson-builder.component.html',
  styleUrls: ['./lesson-builder.component.css']
})
export class LessonBuilderComponent implements OnInit {
  @Input('lesson') lesson: LessonModel;

  constructor() { }

  ngOnInit() {
  }

}
