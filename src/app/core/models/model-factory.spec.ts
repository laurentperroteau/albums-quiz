import { TestBed, inject } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';

import { WithModelFactory } from './model-fatory';

describe('Model factory =>', () => {
  class Dumb {
  }

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

  it('should create corresponding FormControl on creating ReactiveForm from Model', inject([FormBuilder], (fb: FormBuilder) => {
    const test = new TestModel();
    test.id = 2;
    test.createForm(fb);

    expect(test).toEqual(jasmine.any(TestModel));
    expect(test.form).not.toBeUndefined();
    expect(test.form.controls.id).toEqual(jasmine.any(FormControl));
    expect(test.form.controls.id.value).toEqual(2);
  }));

  it('should update model on changing form value', inject([FormBuilder], (fb: FormBuilder) => {
    const test = new TestModel();
    test.id = 2;
    test.createForm(fb);
    test.form.controls.id.setValue(3);
    test.updateFromFormAndReturnIt();

    expect(test.id).toEqual(3);
  }));
});
