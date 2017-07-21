import * as _ from 'lodash';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

// TODO: voir déplacer dans shared ou core module ?
// TODO: add test
export class Question {
  id?: number;
  label: string;
  choices: QuestionChoices[] = [];

  constructor(objRaw?: Partial<Question>) {
    const objDefault: Partial<Question> = {
      id: null,
      label: '',
      choices: []
    };

    _.merge(this, objDefault, objRaw);

    for (let i = 0; i < 3; i++) {
      this.choices.push({label: 'Lorem ipsum'});
    }
  }
}

type keyOfQuestion = keyof Question;
const REQUIRED: keyOfQuestion[] = ['label', 'choices'];
const DISABLED: keyOfQuestion[] = [];

export class QuestionForm extends Question {

  constructor(fbInstance: FormBuilder, objRaw?: Partial<Question>) {
    super(objRaw);

    const form = convertObjToForm(this, fbInstance);
    // TODO: return
  }
}

function convertObjToForm(Obj, fbInstance) {
  const form = {};

  Object.keys(Obj).forEach((key: keyOfQuestion) => {
    form[key] = convertObjToControl(Obj[key], key, fbInstance);
  });

  return form;
}

export class QuestionChoices {
  label: string;
}

// TODO: move
function convertObjToControl(data, key, fbInstance): any {
  let control: FormControl | FormArray;

  if (_.isArray(data)) {
    const arrayControl: FormControl[] = [];
    data.forEach(item => {
      arrayControl.push(convertObjToControl(item, key, fbInstance));
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
