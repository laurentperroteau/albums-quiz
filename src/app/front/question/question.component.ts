import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Question } from './question.model';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-front-question',
  template: `
    <form [formGroup]="question.form">
      <input formControlName="id"/>
      <input formControlName="label"/>
      <md-radio-group formControlName="radioResponse">
        <div formArrayName="radios">
          <md-radio-button *ngFor="let radio of radios.controls;" [value]="radio.value">
            {{ radio.value.label }}
          </md-radio-button>
        </div>
      </md-radio-group>
      <button (click)="submit()">Submit</button>
    </form>
    <pre>{{ question.form.value | json }}</pre>
    <hr/>
    <app-firebase></app-firebase>
  `,
})
export class QuestionComponent {
  question: Question;

  get radios(): FormArray { return this.question.form.get('radios') as FormArray; }

  constructor(
    private _fb: FormBuilder,
    private _questionService: QuestionService
  ) {
    this.question = this._questionService.getWithForm();
  }

  submit() {
    this._questionService.save();
  }
}
