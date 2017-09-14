import { Observable } from 'rxjs/Rx';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-bo-question',
  template: `
    <h2>
      <span *ngIf="(paramRef | async) === 'new'">Créer</span>
      <span *ngIf="(paramRef | async) !== 'new'">Editer</span>
      une question
    </h2>
    <app-bo-question-form
      [isNew]="(paramRef | async)"
      [question]="(question$ | async)"
      (onUpdate)="onUpdate($event)">
    </app-bo-question-form>
  `,
})
export class BoQuestionComponent implements OnInit {
  paramRef: Observable<string>;
  question$: Observable<Question>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.paramRef = this._route.params.map((params: Params) => params['refQuestion']);

    this.question$ = this.paramRef.flatMap(param => {
      if (param === 'new') {
        return Observable.of(new Question());
      } else {
        return this._questionService.getOne(param);
      }
    });
  }

  onUpdate(updatedQuestion: Question) {
    if (updatedQuestion.obs$) {
      // TODO: problème, en utilisant update depuis le composant, pas d'accès au service d'ajout de message de success
      updatedQuestion.save().then(this._redirectToBo.bind(this));
    } else {
      this._questionService.add(updatedQuestion); // .then(this._redirectToBo.bind(this));
    }
  }

  private _redirectToBo() {
    this._router.navigate(['/bo']);
  }
}
