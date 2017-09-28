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
      (onUpdate)="onResponse($event)">
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

  onResponse(questionWithResponse: Question) {
    console.log('la réponse', questionWithResponse);
    if (questionWithResponse.isResponseValid()) {
      this._redirectToQuestionList();
    } else {
      console.debug('Pas la bonne réponse :(');
    }
  }

  private _redirectToQuestionList() {
    console.debug('TODO : ne fonctionne pas, un problème de module ou configuration');
    this._router.navigate(['../../'], { relativeTo: this._route });
    /*
    Solution qui devrait fonctionner mais recharge la page (dans tous les cas utiliser un service)
    this._router.navigate(['/quiz', 'album', '-Ku455YIEpbVRNyvVEdm'], { relativeTo: this._route });
    ou
    this._router.navigate(['../../'], { relativeTo: this._route })
    ou
    this._route.params.map(p => p.refAlbum).subscribe(refAlbum => {
      this._router.navigate(['../../../', refAlbum], { relativeTo: this._route });
    });
    */
  }
}
