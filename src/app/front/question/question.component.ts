import { Observable } from 'rxjs/Rx';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Question, QuestionService } from '../../core';


@Component({
  selector: 'app-front-question',
  template: `
    <h2>
      Répondre à la question :
    </h2>
    <app-front-question-form
      [question]="(question$ | async)"
      (onUpdate)="onAnswer($event)">
    </app-front-question-form>
  `,
})
export class FrontQuestionComponent implements OnInit {
  paramRefQuestion$: Observable<string>;
  question$: Observable<Question>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _questionService: QuestionService
  ) {}

  ngOnInit(): void {
    const paramRef$ = this._route.params.map((params: Params) => params);
    this.paramRefQuestion$ = paramRef$.map((params: Params) => params['refQuestion']);

    this.question$ = paramRef$.flatMap(params => {
      if (params['refQuestion'] === 'new') {
        return Observable.of(new Question({albumRef: params['refAlbum']}));
      } else {
        return this._questionService.getOne(params['refQuestion']);
      }
    });
  }

  onAnswer(answer: Question) {
    console.log('la réponse', answer);
  }

  private _redirectToBo() {
    this._router.navigate(['/bo']);
  }
}
