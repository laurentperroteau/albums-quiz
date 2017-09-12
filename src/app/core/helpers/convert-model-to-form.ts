import * as _ from 'lodash';

import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

type FormGroupOrControl = FormGroup | FormControl | FormArray;
interface ModelToForm {
  [key: string]: FormGroupOrControl;
}
export type ControlCallback = (key: string, control: FormControl | FormArray) => void;

// TODO: créer helper
function isObjectNotArray(obj: any) {
  return _.isObject(obj) && !_.isArray(obj)
}

export function convertModelToForm(Obj: any, fbInstance: FormBuilder, propertiesToIgnore = [], additionalActionOnControl?: ControlCallback): ModelToForm {
  const form: ModelToForm = {};

  Object.keys(Obj).forEach((key: string) => {
    if (propertiesToIgnore.indexOf(key) === -1) {
      if (isObjectNotArray(Obj[key])) {
        form[key] = fbInstance.group(convertModelToForm(Obj[key], fbInstance, propertiesToIgnore, additionalActionOnControl));
      } else {
        form[key] = convertDataToControl(Obj[key], key, fbInstance, propertiesToIgnore, additionalActionOnControl);
      }
    }
  });

  return form;
}

function convertDataToControl(data: any, key: string, fbInstance: FormBuilder, propertiesToIgnore = [], additionalActionOnControl?: ControlCallback) {
  let control: FormControl | FormArray;

  if (_.isArray(data)) {
    const arrayControl: FormGroupOrControl[] = [];
    data.forEach(item => {
      if (isObjectNotArray(item)) {
        arrayControl.push(fbInstance.group(convertModelToForm(item, fbInstance, propertiesToIgnore, additionalActionOnControl)));
      } else {
        arrayControl.push(convertDataToControl(item, key, fbInstance, propertiesToIgnore, additionalActionOnControl));
      }
    });

    control = fbInstance.array(arrayControl);
  } else {
    control = fbInstance.control(data);
  }

  if (additionalActionOnControl) {
    additionalActionOnControl(key, control);
  }

  return control;
}
