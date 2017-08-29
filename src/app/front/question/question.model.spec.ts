import { TestBed, inject } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { Question } from './question.model';

describe('QuestionService', () => {
  const question = new Question({id: 2});

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder
      ]
    });
  });

  it('create Question return model type Question with id === 2', _ => {
    expect(question).toEqual(jasmine.any(Question));
    expect(question.id).toEqual(2);
  });

  it('create form of Question create control id value === 2', inject([FormBuilder], (fb: FormBuilder) => {
    question.createForm(fb);
    expect(question).toEqual(jasmine.any(Question));
    expect(question.form).not.toBeUndefined();
    expect(question.form.controls.id.value).toEqual(2);
  }));

  it('changing form value to 3 and updating model, model id === 3', inject([FormBuilder], (fb: FormBuilder) => {
    question.form.controls.id.setValue(3);
    question.updateWithFormValue();
    expect(question.id).toEqual(3);
  }));
});
