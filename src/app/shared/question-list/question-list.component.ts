import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { QuestionService } from '../../core';
import { Ref } from '../../core';
import { AlbumQuestions } from '../../bo/models/album-questions.model';

@Component({
  selector: 'app-question-list',
  template: `
    <ul>
      <li *ngFor="let question of questionsByAlbum$ | async ">
        <a [routerLink]="getLink(question.$key)">
          {{ question.$value }}
        </a>
      </li>
    </ul>
  `,
})
export class QuestionListComponent implements OnInit {
  questionsByAlbum$: Observable<AlbumQuestions[]>;

  @Input() albumRef: Ref;
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
