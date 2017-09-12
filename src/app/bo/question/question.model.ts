import * as _ from 'lodash';

import { BaseNode, WithModelFactory } from '../../core/';

// TODO: add test
export class Question extends WithModelFactory(BaseNode) {
  id?: number;
  label: string;
  radios?: QuestionRadios;
  radioResponse?: string;

  constructor(objRaw?: Partial<any>) {
    super();
    const objDefault: Partial<any> = {
      id: null,
      label: '',
      radios: null,
      radioResponse: null
    };

    _.merge(this, objDefault, objRaw);

    /*for (let i = 0; i < 3; i++) {
      this.choices.push({key: 'lorem', label: 'Lorem ipsum'});
    }*/
  }

  // exemple de méthode factory spécifique au model
  getDuplicata() {
    const duplicata = Object.assign({}, this);
    duplicata.id = null;
    return duplicata;
  }
}

export class QuestionRadios {
  key: string;
  label: string;
}
