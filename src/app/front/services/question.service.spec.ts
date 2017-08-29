import { TestBed, inject } from '@angular/core/testing';

import { QuestionService } from './question.service';
import { Question } from '../question/question.model';

describe('QuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuestionService
      ]
    });
  });

  it('should be created', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));

  it('.get() should return new Question', inject([QuestionService], (service: QuestionService) => {
    expect(service.get()).toEqual(jasmine.any(Question));
  }));

  it('.getWithForm() should return new Question with form', inject([QuestionService], (service: QuestionService) => {
    const question = service.getWithForm();
    expect(question).toEqual(jasmine.any(Question));
    expect(question).not.toBeUndefined();
  }));
});
