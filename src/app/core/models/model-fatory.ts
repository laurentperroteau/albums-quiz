import * as _ from 'lodash';

import { FormBuilder, FormGroup } from '@angular/forms';

import { FirebaseObjectObservable } from 'angularfire2/database';

import { convertModelToForm } from '../helpers/convert-model-to-form';

type Constructor<T> = new(...args: any[]) => T;

// TODO: devoir ignorer des propriétés n'est pas idéal, voir pour créer un objet factory pour le model
const FACTORY_PROPERTIES = ['form', 'obs$'];

// As mixin
export const WithModelFactory = <T extends Constructor<{}>>(Base: T) => class extends Base {
  form?: FormGroup;
  obs$?: FirebaseObjectObservable<any>;

  get() {
    return _.pick(
      this,
      // Get properties of object with factory utilities
      Object.getOwnPropertyNames(this).filter((p: keyof this) => FACTORY_PROPERTIES.indexOf(p) === -1)
    );
  }

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
    return this.get();
  }

  updateFromFormAndReturnIt() {
    _.merge(this, this.form.value);
    return this.get();
  }

  setObs(obs$) {
    this.obs$ = obs$;
  }

  save() {
    console.log('save', this.updateFromFormAndReturnIt());
    return this.obs$.update(this.updateFromFormAndReturnIt()); // update method include in Obs replace extra service
  }
};
