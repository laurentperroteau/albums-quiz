import { Component, OnInit } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-front-question',
  template: `
    <app-front-question-form
      [form]="question.form"
      (onSubmit)="submit()">
    </app-front-question-form>
    <pre>{{ question.form.value | json }}</pre>
    <hr/>
    <app-firebase></app-firebase>
  `,
})
export class QuestionComponent {
  question: Question;

  constructor(
    private _questionService: QuestionService
  ) {
    this.question = this._questionService.getWithForm();
  }

  submit() {
    this._questionService.save();
  }
}
