import * as _ from 'lodash';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

// TODO: voir déplacer dans shared ou core module ?
// TODO: add test
export class Question {
  id?: number;
  label: string;
  radio?: QuestionRadio;

  constructor(objRaw?: Partial<any>) {
    const objDefault: Partial<any> = {
      id: null,
      label: '',
      radio: null
    };

    _.merge(this, objDefault, objRaw);

    /*for (let i = 0; i < 3; i++) {
      this.choices.push({key: 'lorem', label: 'Lorem ipsum'});
    }*/
  }
}

type keyOfQuestion = keyof Question;
const REQUIRED: keyOfQuestion[] = ['label', 'radio'];
const DISABLED: keyOfQuestion[] = [];

export class QuestionForm extends Question {

  constructor(fbInstance: FormBuilder, objRaw?: Partial<Question>) {
    super(objRaw);

    _.merge(this, convertModelToForm(this, fbInstance));
  }
}

function convertModelToForm(Obj, fbInstance) {
  const form = {};

  Object.keys(Obj).forEach((key: keyOfQuestion) => {
    form[key] = convertModelToControl(Obj[key], key, fbInstance);
  });

  return form;
}

export class QuestionRadio {
  choices: QuestionRadioChoices;
  response: string;
}

export class QuestionRadioChoices {
  key: string;
  label: string;
}

// TODO: move
function convertModelToControl(data, key, fbInstance): any {
  let control: FormControl | FormArray;

  if (_.isArray(data)) {
    const arrayControl: FormControl[] = [];
    data.forEach(item => {
      arrayControl.push(convertModelToControl(item, key, fbInstance));
    });

    control = fbInstance.array(arrayControl);
  } else {
    control = fbInstance.control(data);
  }

  if (DISABLED.indexOf(key) !== -1) {
    control.disable();
  }

  if (REQUIRED.indexOf(key) !== -1) {
    control.setValidators(Validators.required)
  }

  return control;
}
