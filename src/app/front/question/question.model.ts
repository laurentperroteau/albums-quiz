import * as _ from 'lodash';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export class ModelFactory {
  form?: FormGroup;

  createForm(fbInstance: FormBuilder) {
    this.form = fbInstance.group(convertModelToForm(this, fbInstance));
  }

  updateForm(fbInstance: FormBuilder) {
    if (!this.form) {
      this.createForm(fbInstance);
    } else {
      this.form.patchValue(this);
    }
  }

  deleteForm() {
    if (this.form) {
      delete this.form;
    }
  }

  updateWithFormValue() {
    _.merge(this, this.form.value);
    return this;
  }

  updateWithFormValueAndDeleteForm() {
    this.updateWithFormValue();
    this.deleteForm();
    return this;
  }

}

// TODO: voir déplacer dans shared ou core module ?
// TODO: add test
export class Question extends ModelFactory {
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

type keyOfQuestion = keyof Question;
const REQUIRED: keyOfQuestion[] = ['label', 'radios'];
const DISABLED: keyOfQuestion[] = [];

/*export class QuestionForm extends QuestionFactory {

  constructor(fbInstance: FormBuilder, objRaw?: Partial<Question>) {
    super(objRaw);

    _.merge(this, convertModelToForm(this, fbInstance));
  }
}*/

function convertModelToForm(Obj: any, fbInstance: FormBuilder) {
  const form = {};

  Object.keys(Obj).forEach((key: keyOfQuestion) => {
    form[key] = convertModelToControl(Obj[key], key, fbInstance);
  });

  return form;
}



export class QuestionRadios {
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
