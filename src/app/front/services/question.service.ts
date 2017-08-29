import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Question } from '../question/question.model';

@Injectable()
export class QuestionService {
  question: Question;

  constructor(
    private _fb: FormBuilder,
  ) {
    this.question = new Question({
      id: 2,
      label: `Quelle est la variété de la banane sur l'album ?`,
      radios:  [
        { key: 'plantain', label: 'Plantain' },
        { key: 'cavendish', label: 'Cavendish' },
      ]
    });
  }

  get() {
    return this.question;
  }

  getWithForm() {
    this.question.createForm(this._fb);
    return this.question;
  }

  save() {
    this.question.updateWithFormValue();
    console.log('save', this.question); // TODO: persist
  }
}
