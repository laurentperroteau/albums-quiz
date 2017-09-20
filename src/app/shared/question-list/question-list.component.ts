import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Question } from '../../bo/models/question.model';

import { QuestionService } from '../../core';
import { Ref } from '../../core';

@Component({
  selector: 'app-question-list',
  template: `
    <ul>
      <li *ngFor="let question of questionsByAlbum$ | async ">
        <a [routerLink]="getLink(question.$key)">
          ({{ question.$value  }})
        </a>
      </li>
    </ul>
  `,
})
export class QuestionListComponent implements OnInit {
  questionsByAlbum$: Observable<Question[]>;

  @Input() albumRef: Ref;
  @Input() baseLink: any[];

  constructor(
    private _questionService: QuestionService,
  ) {}

  ngOnInit() {
    // this.questionsByAlbum$ = this.getQuestionsByAlbum();
    this.getQuestionsByAlbum().subscribe(c => console.log(c)); // TODO: possède bien une key
  }

  getLink(key) {
    return this.baseLink && key ? [this.baseLink, ...key] : this.baseLink;
  }

  getQuestionsByAlbum() {
    return this._questionService.getQuestionsByAlbum(this.albumRef);
  }
}
