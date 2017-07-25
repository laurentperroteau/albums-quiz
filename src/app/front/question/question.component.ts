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
      <div formArrayName="radio">
        {{ radio.value }}
        <!-- TODO: utiliser composant radio angular material -->
        <!--<div *ngFor="let choice of radio.controls; let i = index">
          {{ i }}
          <input [formControlName]="i" type="radio" [value]="choice.value" [id]="choice.value.key" [checked]="choices.value === vhoi" />
          <label [for]="choice.value.key">{{ choice.value.label }}</label>
        </div>-->
      </div>
    </form>
    <pre>{{ questionForm.value | json }}</pre>
  `,
})
export class QuestionComponent {
  questionForm: FormGroup;

  get radio(): FormArray { return this.questionForm.get('radio') as FormArray; }

  constructor(
    private _fb: FormBuilder,
    private _questionService: QuestionService
  ) {
    this.createForm();
  }

  createForm() {
    const question = new QuestionForm(
      this._fb,
      {
        id: 2,
        label: `Quelle est la variété de la banane sur l'album ?`,
        radio: {
          choices: [
            { key: 'plantain', label: 'Plantain' },
            { key: 'cavendish', label: 'Cavendish' },
          ],
          response: 'plantain'
        }
      } as any
    );
    console.log(question);
    this.questionForm = this._fb.group(question);
    console.log(this.questionForm);
  }
}
