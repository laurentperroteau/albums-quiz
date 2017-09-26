import * as _ from 'lodash';

import { BaseNode, Ref } from './db.model';
import { WithModelFactory } from './model-fatory';

// TODO: add test
export class Question extends WithModelFactory(BaseNode) {
  label: string;
  radios?: QuestionRadios[];
  radioResponse?: string;
  albumRef: Ref;

  constructor(objRaw?: Partial<any>) {
    super();
    const objDefault: Partial<any> = {
      label: '',
      radios: [new QuestionRadios(), new QuestionRadios()],
      radioResponse: ''
    };

    _.merge(this, objDefault, objRaw);

    console.debug('new question', this);
  }

  // exemple de méthode factory spécifique au model
  getDuplicata() {}
}

export class QuestionRadios {
  key: string;
  label: string;

  constructor(objRaw?: Partial<QuestionRadios>) {
    const objDefault: Partial<QuestionRadios> = {
      key: '',
      label: '',
    };

    _.merge(this, objDefault, objRaw);
  }
}
