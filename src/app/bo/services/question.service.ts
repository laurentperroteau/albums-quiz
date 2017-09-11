import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Question } from '../question/question.model';

@Injectable()
export class QuestionService {
  question: Observable<Question>;

  constructor(
    private _fb: FormBuilder,
  ) {
    this.question = Observable.of(
      new Question({
        id: 2,
        label: `Quelle est la variété de la banane sur l'album ?`,
        radios:  [
          { key: 'plantain', label: 'Plantain' },
          { key: 'cavendish', label: 'Cavendish' },
        ]
      })
    );
  }

  get() {
    return this.question;
  }

  getWithForm() {
    return this.question.map(q => {
      q.createForm(this._fb);
      return q;
    });
  }

  save() {
    this.question.map(q => {
      q.updateFromForm();
      return q;
    }).subscribe(q => console.log(q)); // TODO : persist ? qui subscribe ?
  }
}
