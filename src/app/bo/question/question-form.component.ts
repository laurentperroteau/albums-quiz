import * as _ from 'lodash';

import { Component, Input, EventEmitter, Output, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import { Question } from '../../core/models/question.model';

@Component({
  selector: 'app-bo-question-form',
  template: `
    <div *ngIf="question">
      <form [formGroup]="question.form">
        Intitulé question : <input formControlName="label"/>
        <ul>
          <li formArrayName="radios">
            <div *ngFor="let radio of radios.controls; let i=index" [formGroupName]="i">
              Réponse {{ i }}
              Clé : <input formControlName="key"/>
              Valeur : <input formControlName="label"/>
            </div>
          </li>
        </ul>
        Clé de la réponse : <input formControlName="radioResponse"/>
        <button type="submit" (click)="submit()">{{ submitLabel }}</button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
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
