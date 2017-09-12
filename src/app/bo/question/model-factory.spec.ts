import { TestBed, inject } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { Question } from './question.model';
import { WithModelFactory } from '../../core/models/model-fatory';

describe('Question model', () => {
  class Dumb {};
  class TestModel extends WithModelFactory(Dumb) {
    id: number;
  }
  const test = new TestModel();
  test.id = 2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder
      ]
    });
  });

  it('create form of Model create control id value === 2', inject([FormBuilder], (fb: FormBuilder) => {
    test.createForm(fb);
    expect(test).toEqual(jasmine.any(Question));
    expect(test.form).not.toBeUndefined();
    expect(test.form.controls.id.value).toEqual(2);
  }));

  it('changing form value to 3 and updating model, model id === 3', inject([FormBuilder], (fb: FormBuilder) => {
    test.form.controls.id.setValue(3);
    test.updateFromForm();
    expect(test.id).toEqual(3);
  }));
});
