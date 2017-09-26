import { TestBed, inject } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { WithModelFactory } from './model-fatory';

describe('Model factory', () => {
  class Dumb {}
  class TestModel extends WithModelFactory(Dumb) {
    id: number;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder
      ]
    });
  });

  it('create form of Model create control id value === 2', inject([FormBuilder], (fb: FormBuilder) => {
    const test = new TestModel();
    test.id = 2;
    test.createForm(fb);
    expect(test).toEqual(jasmine.any(TestModel));
    expect(test.form).not.toBeUndefined();
    expect(test.form.controls.id.value).toEqual(2);
  }));

  it('changing form value to 3 and updating model, model id === 3', inject([FormBuilder], (fb: FormBuilder) => {
    const test = new TestModel();
    test.id = 2;
    test.createForm(fb);
    test.form.controls.id.setValue(3);
    test.updateFromForm();
    expect(test.id).toEqual(3);
  }));
});
