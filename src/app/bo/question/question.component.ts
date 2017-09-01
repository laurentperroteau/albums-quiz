import { Component, OnInit } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from '../services/question.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-bo-question',
  template: `
    <app-bo-question-form
      [form]="(question$ | async)?.form"
      (onSubmit)="submit()">
    </app-bo-question-form>
    <hr/>
    <app-firebase></app-firebase>
  `,
})
export class QuestionComponent {
  question$: Observable<Question>;

  constructor(
    private _questionService: QuestionService
  ) {
    this.question$ = this._questionService.getWithForm();
  }

  submit() {
    this._questionService.save();
  }
}
