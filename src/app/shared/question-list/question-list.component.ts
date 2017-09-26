import { Observable } from 'rxjs/Rx';

import { Component, Input, OnInit } from '@angular/core';

import { Question } from '../../core/models/question.model';
// import { Ref } from '../../core/models/db.model';
import { QuestionService } from '../../core';


@Component({
  selector: 'app-question-list',
  template: `
    <ul>
      <li *ngFor="let question of questionsByAlbum$ | async ">
        <a [routerLink]="getLink(question.$key)">
          {{ question.label }}
        </a>
      </li>
    </ul>
  `,
})
export class QuestionListComponent implements OnInit {
  questionsByAlbum$: Observable<Question[]>;

  @Input() albumRef: any;
  @Input() baseLink: any[];

  constructor(
    private _questionService: QuestionService,
  ) {}

  ngOnInit() {
    this.questionsByAlbum$ = this.getQuestionsByAlbum();
  }

  getLink(key) {
    return this.baseLink && key ? [...this.baseLink, key] : this.baseLink;
  }

  getQuestionsByAlbum() {
    return this._questionService.getQuestionsByAlbum(this.albumRef);
  }
}
