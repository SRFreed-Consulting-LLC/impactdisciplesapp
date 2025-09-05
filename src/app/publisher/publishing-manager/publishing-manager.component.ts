import { Component, OnInit, ViewChild } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { BookService } from 'src/app/shared/services/book.service';
import { confirm } from 'devextreme/ui/dialog';
import { DxFormComponent } from 'devextreme-angular';
import { SeriesService } from 'src/app/shared/services/series.service';
import { Store } from '@ngxs/store';
import { SeriesModel } from 'src/app/shared/models/series.model';
import { BookModel } from 'src/app/shared/models/book.model';
import { ShowBookSeriesListModal } from '../series-list/series-list-modal.actions';
import { SeriesAddEditModal } from '../modals/series-modal/series-modal.actions';
import { BookAddEditModal } from '../modals/book-modal/book-modal.actions';
import { UnitModel } from 'src/app/shared/models/unit.model';
import { UnitService } from 'src/app/shared/services/unit.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { LessonModel } from 'src/app/shared/models/lesson.model';
import { UnitAddEditModal } from '../modals/unit-modal/unit-modal.actions';
import { LessonAddEditModal } from '../modals/lesson-modal/lesson-modal.actions';

@Component({
  selector: 'app-publishing-manager',
  templateUrl: './publishing-manager.component.html',
  styleUrls: ['./publishing-manager.component.css']
})
export class PublishingManagerComponent implements OnInit {
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  itemType = "Series";
  bookBySeries:{}[] = [];
  treeItems: TreeViewItem[] = [];

  constructor(private bookService: BookService,
    private seriesService: SeriesService,
    private unitService: UnitService,
    private lessonService: LessonService,
    private store: Store) { }

  ngOnInit() {
    this.getTreeData()
  }

  showModal = (e) => {
    if(e.itemData.type == 'series'){
      this.store.dispatch(new SeriesAddEditModal(e.itemData.data));
    } else if(e.itemData.type == 'book'){
      this.store.dispatch(new BookAddEditModal(e.itemData.data));
    } else if(e.itemData.type == 'unit'){
      this.store.dispatch(new UnitAddEditModal(e.itemData.data));
    } else if(e.itemData.type == 'lesson'){
      this.store.dispatch(new LessonAddEditModal(e.itemData.data));
    }
  }

  showBookSeriesListModal = () => {
    this.store.dispatch(new ShowBookSeriesListModal());
  }

  public getTreeData(){
    this.treeItems = [];
    this.buildDataTree().then(seriesList => {
      seriesList.forEach(series =>{
        let seriesTVI = new TreeViewItem();
        seriesTVI.id = series.id;
        seriesTVI.title = series.title
        seriesTVI.items = [];
        seriesTVI.type = "series";
        seriesTVI.expanded = true;
        seriesTVI.data = series;

        this.treeItems.push(seriesTVI);

        series.books.forEach(book => {
          let bookTVI = new TreeViewItem();
          bookTVI.id = book.id;
          bookTVI.title = book.title
          bookTVI.items = [];
          bookTVI.type = "book";
          bookTVI.data = book

          seriesTVI.items.push(bookTVI);

          book.units.forEach(unit => {
            let unitTVI = new TreeViewItem();
            unitTVI.id = unit.id;
            unitTVI.title = unit.title
            unitTVI.items = [];
            unitTVI.type = "unit";
            unitTVI.data = unit

            bookTVI.items.push(unitTVI);

            unit.lessons.forEach(lesson => {
              let lessonTVI = new TreeViewItem();
              lessonTVI.id = lesson.id;
              lessonTVI.title = lesson.title
              lessonTVI.items = [];
              lessonTVI.type = "lesson";
              lessonTVI.data = lesson

              unitTVI.items.push(lessonTVI);
            })

          })

          book.lessons.forEach(lesson => {
            let lessonTVI = new TreeViewItem();
            lessonTVI.id = lesson.id;
            lessonTVI.title = lesson.title
            lessonTVI.items = [];
            lessonTVI.type = "lesson";
            lessonTVI.data = lesson

            bookTVI.items.push(lessonTVI);
          })
        })
      })

    })
  }

  private buildDataTree(): Promise<SeriesModel[]>{
    let retval: SeriesModel[] = [];

    return this.seriesService.getAll().then(async seriesList => {
      let books: BookModel[] = await this.bookService.getAll();
      let units: UnitModel[] = await this.unitService.getAll();
      let lessons: LessonModel[] = await this.lessonService.getAll();

      seriesList.forEach(async series => {
        let matchedBooks: BookModel[] = books.filter(book => book.series == series.id);
        series.books = matchedBooks;

        matchedBooks.forEach(book => {
          let matchedUnits: UnitModel[] = units.filter(unit => unit.book == book.id);

          matchedUnits.forEach(unit => {
             let matchedLessons: LessonModel[] = lessons.filter(lesson => lesson.unit && lesson.unit == unit.id);
             unit.lessons = matchedLessons;
          })

          book.units = matchedUnits;

          let matchedLessons: LessonModel[] = lessons.filter(lesson => !lesson.unit && lesson.book == book.id);

          book.lessons = matchedLessons;
        })

        retval.push(series)
      })

      return retval;
    })
  }
}

class TreeViewItem{
  id: string;
  expanded: boolean = false;
  title: string;
  items?: TreeViewItem[];
  data: any;
  type: string;
}


