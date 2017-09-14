import * as _ from 'lodash';

import { Component, Input, EventEmitter, Output, OnInit, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Question } from '../models/question.model';

@Component({
  selector: 'app-bo-question-form',
  template: `
    <div *ngIf="question">
      <form [formGroup]="question.form">
        <input formControlName="id"/>
        <input formControlName="label"/>
        <!--<md-radio-group formControlName="radioResponse">
          <div formArrayName="radios">
            <md-radio-button *ngFor="let radio of radios.controls;" [value]="radio.value">
              {{ radio.value.label }}
            </md-radio-button>
          </div>
        </md-radio-group>-->
        <button type="submit" (click)="submit()">{{ submitLabel }}</button>
      </form>
    </div>
  `,
})
export class BoQuestionFormComponent implements OnInit, OnChanges {
  @Input() isNew: string;
  @Input() question: Question;
  @Output() onUpdate: EventEmitter<Question> = new EventEmitter(); // return new object

  submitLabel = 'Créer';

  get radios(): FormArray { return this.question.form.get('radios') as FormArray; }

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    if (this.isNew === 'new') {
      console.log('question', this.question);
      this.question = new Question();
      this.question.createForm(this._fb);
    } else {
      // TODO: désactive le bouton en attendant l'obs
      this.submitLabel = 'Actualiser';
    }
  }

  ngOnChanges(changes) {
    if (this.isNew !== 'new' && changes.question && this.question) {
      console.log('question', this.question);
      if (!_.get(this.question, 'form')) {
        this.question.createForm(this._fb);
      }
    }
  }

  submit() {
    this.onUpdate.emit(this.question);
  }
}
