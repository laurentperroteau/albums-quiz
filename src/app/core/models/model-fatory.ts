import * as _ from 'lodash';

import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FirebaseObjectObservable } from 'angularfire2/database';

import { convertModelToForm } from '../helpers/convert-model-to-form';

export class ModelFactory {
  form?: FormGroup;
  obs$?: FirebaseObjectObservable<any>;

  createForm(fbInstance: FormBuilder) {
    this.form = fbInstance.group(convertModelToForm(this, fbInstance, ['obs$']));
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

  updateFromForm() {
    _.merge(this, this.form.value);
    return this;
  }

  // TODO: devrait retourner l'obj et non pas form.value puisque certaines données pourrait ne pas faire partie du form
  updateFromFormAndReturnIt() {
    _.merge(this, this.form.value);
    return this.form.value;
  }

  setObs(obs$) {
    this.obs$ = obs$;
  }

  save() {
    console.log('save', this.form.value);
    return this.obs$.update(this.form.value); // update method include in Obs replace extra service
  }
}
