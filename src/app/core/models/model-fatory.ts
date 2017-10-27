import * as _ from 'lodash';

import { FormBuilder, FormGroup } from '@angular/forms';

import { AngularFireObject } from 'angularfire2/database';

import { ModelToForm } from '../helpers/convert-model-to-form';

type Constructor<T> = new(...args: any[]) => T;

// TODO: devoir ignorer des propriétés n'est pas idéal, voir pour créer un objet factory pour le model
const FACTORY_PROPERTIES = ['.indexOn', 'form', 'obs$'];

// As mixin
export const WithModelFactory = <T extends Constructor<{}>>(Base: T) => class extends Base {
  form?: FormGroup;
  obs$?: AngularFireObject<any>; // TODO: Observable ?

  get() {
    return _.pick(
      this,
      // Get properties of object with factory utilities
      Object.getOwnPropertyNames(this).filter((p: keyof this) => FACTORY_PROPERTIES.indexOf(p) === -1)
    );
  }

  createForm(fbInstance: FormBuilder) {
    this.form = fbInstance.group(ModelToForm.convertModelToForm(this, fbInstance, ['obs$']));
  }

  createGroup(fbInstance: FormBuilder, obj) {
    console.log(ModelToForm.convertModelToForm(obj, fbInstance));
    return fbInstance.group(ModelToForm.convertModelToForm(obj, fbInstance));
  }

  createControl(fbInstance: FormBuilder, data) {
    return fbInstance.control(data);
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

  updateFromFormAndReturnIt() {
    if (this.form) {
      _.merge(this, this.form.value);
    }
    return this.get();
  }

  setObs(obs$) {
    this.obs$ = obs$;
  }

  save() {
    console.log('save', this.updateFromFormAndReturnIt());
    return this.obs$.update(this.updateFromFormAndReturnIt()); // update method include in Obs replace extra service
  }

  private _extra() {
    const toKebab = this.form.value.name || this.form.value.label || '';
    return { key: _.kebabCase(toKebab) };
  }
};
