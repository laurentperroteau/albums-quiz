import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Question, QuestionForm } from '../question/question.model';

@Injectable()
export class QuestionService {

  constructor(
    private _fb: FormBuilder,
  ) { }

  get() {
    return new Question();
  }

  getAsForm() {
    return Observable.of(
      new QuestionForm(
        this._fb,
        {
          id: 2,
          label: `Quelle est la variété de la banane sur l'album ?`,
          radios:  [
            { key: 'plantain', label: 'Plantain' },
            { key: 'cavendish', label: 'Cavendish' },
          ]
        } as any
      )
    );  // TODO: fix any
  }
}
