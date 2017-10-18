import * as _ from 'lodash';

import { BaseNode, Ref } from './db.model';
import { WithModelFactory } from './model-fatory';

// TODO: add test
export class Question extends WithModelFactory(BaseNode) {
  '.indexOn': 'label';
  label: string;
  radios: QuestionRadios[];
  radioResponse: QuestionRadios;
  userResponse: any;
  albumRef: Ref;

  constructor(objRaw?: Partial<any>) {
    super();
    const objDefault: Partial<any> = {
      label: '',
      radios: [new QuestionRadios(), new QuestionRadios()],
      radioResponse: null,
      userResponse: null,
    };

    _.merge(this, objDefault, objRaw);

    console.debug('new question', this);
  }

  isResponseValid() {
    this.updateFromFormAndReturnIt();
    return this.radioResponse === _.get(this.userResponse, 'key');
  }
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
