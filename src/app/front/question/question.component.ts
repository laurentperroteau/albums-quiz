import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Question, QuestionForm } from './question.model';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-front-question',
  template: `
    <form [formGroup]="questionForm">
      <input formControlName="id" />
      <input formControlName="label" />
      <md-radio-group formControlName="radioResponse">
        <div formArrayName="radios">
          <md-radio-button *ngFor="let radio of radios.controls;" [value]="radio.value">
            {{ radio.value.label }}
          </md-radio-button>
        </div>
      </md-radio-group>
    </form>
    <pre>{{ questionForm.value | json }}</pre>
    <hr />
    <app-firebase></app-firebase>
  `,
})
export class QuestionComponent {
  questionForm: FormGroup;

  get radios(): FormArray { return this.questionForm.get('radios') as FormArray; }

  constructor(
    private _fb: FormBuilder,
    private _questionService: QuestionService
  ) {
    this.createForm();
  }

  createForm() {
    this._questionService.getAsForm().subscribe(q => {
      this.questionForm = this._fb.group(q);
      console.log(this.questionForm);
    });
  }
}
