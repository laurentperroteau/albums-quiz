import * as _ from 'lodash';
import { Type } from 'class-transformer';

import { BaseNode, Ref } from './db.model';
import { WithModelFactory } from './model-fatory';
import { FormArray, FormBuilder } from '@angular/forms';

// TODO: add test
export class Question extends WithModelFactory(BaseNode) {
  '.indexOn': 'label'; // TODO: utile ? => se documenter
  label: string;
  @Type(() => QuestionRadios) radios: QuestionRadios[];
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

  addRadio(fbInstance: FormBuilder) {
    const newRadio = new QuestionRadios();
    this.radios.push(newRadio);

    if (this.form) {
      // TODO: map constrols
      (this.form.controls.radios as FormArray).push(this.createGroup(fbInstance, newRadio));
      console.log(this.form.controls.radios);
    }
  }
}

export class QuestionRadios {
  key: string;
  label: string;

  constructor(objRaw?: QuestionRadios) {
    const objDefault: QuestionRadios = {
      key: '',
      label: '',
    };

    _.merge(this, objDefault, objRaw);
  }
}
