import * as _ from 'lodash';

import { Component, Input, EventEmitter, Output, OnInit, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Question } from '../../core/models/question.model';

@Component({
  selector: 'app-front-question-form',
  template: `
    <div *ngIf="question">
      <p>{{ question.label }}</p>
      <form [formGroup]="question.form">
        <md-radio-group formControlName="radioResponse">
          <div formArrayName="radios">
            <md-radio-button *ngFor="let radio of radios.controls;" [value]="radio.value">
              {{ radio.value.label }}
            </md-radio-button>
          </div>
        </md-radio-group>
        <button type="submit" (click)="submit()">Répondre</button>
      </form>
    </div>
  `,
})
export class FrontQuestionFormComponent implements OnInit, OnChanges {
  @Input() question: Question;
  @Output() onUpdate: EventEmitter<Question> = new EventEmitter(); // return new object

  get radios(): FormArray { return this.question.form.get('radios') as FormArray; }

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes.question && this.question) {
      if (!_.get(this.question, 'form')) {
        this.question.createForm(this._fb);
      }
    }
  }

  submit() {
    this.onUpdate.emit(this.question);
  }
}
