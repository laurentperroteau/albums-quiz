import { Observable } from 'rxjs/Rx';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QuestionService } from '../../core';
import { Question } from '../../core/models/question.model';

@Component({
  selector: 'app-bo-question',
  template: `
    <h2>
      <span *ngIf="(paramRefQuestion$ | async) === 'new'">Créer</span>
      <span *ngIf="(paramRefQuestion$ | async) !== 'new'">Editer</span>
      une question
    </h2>
    <app-bo-question-form
      [isNew]="(paramRefQuestion$ | async)"
      [question]="(question$ | async)"
      (onUpdate)="onUpdate($event)">
    </app-bo-question-form>
  `,
})
export class BoQuestionComponent implements OnInit {
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

  onUpdate(updatedQuestion: Question) {
    if (updatedQuestion.obs$) {
      // TODO: problème, en utilisant update depuis le composant, pas d'accès au service d'ajout de message de success
      updatedQuestion.save().then(this._redirectToBo.bind(this));
    } else {
      this._questionService.add(updatedQuestion).subscribe(this._redirectToBo.bind(this));
    }
  }

  private _redirectToBo() {
    this._router.navigate(['/bo']);
  }
}
