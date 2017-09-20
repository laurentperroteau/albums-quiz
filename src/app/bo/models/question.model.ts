import * as _ from 'lodash';

import { BaseNode, Ref, WithModelFactory } from '../../core';

// TODO: add test
export class Question extends WithModelFactory(BaseNode) {
  label: string;
  radios?: QuestionRadios;
  radioResponse?: string;
  albumRef: Ref;

  constructor(objRaw?: Partial<any>) {
    super();
    const objDefault: Partial<any> = {
      label: '',
      radios: null,
      radioResponse: null
    };

    _.merge(this, objDefault, objRaw);

    console.debug('new question', this);

    /*for (let i = 0; i < 3; i++) {
      this.choices.push({key: 'lorem', label: 'Lorem ipsum'});
    }*/
  }

  // exemple de méthode factory spécifique au model
  getDuplicata() {}
}

export class QuestionRadios {
  key: string;
  label: string;
}
