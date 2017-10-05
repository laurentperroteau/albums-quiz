import { Observable } from 'rxjs/Rx';

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Question } from '../../core/models/question.model';
// import { Ref } from '../../core/models/db.model';
import { QuestionService, RouterLinkHelper } from '../../core';


@Component({
  selector: 'app-question-list',
  template: `
    <ul>
      <li *ngFor="let question of questionsByAlbum$ | async ">
        <a [routerLink]="linkPush(baseLink, question.$key)">
          {{ question.label }}
        </a>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionListComponent implements OnInit {
  questionsByAlbum$: Observable<Question[]>;

  @Input() albumRef: any;
  @Input() baseLink: any[];

  linkPush = RouterLinkHelper.push;

  constructor(
    private _questionService: QuestionService,
  ) {}

  ngOnInit() {
    this.questionsByAlbum$ = this.getQuestionsByAlbum();
  }

  getQuestionsByAlbum() {
    return this._questionService.getListByAlbum(this.albumRef);
  }
}
