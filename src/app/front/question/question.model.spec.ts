import { Question } from './question.model';

describe('Question model', () => {
  const question = new Question({id: 2});

  it('create Question return model type Question with id === 2', _ => {
    expect(question).toEqual(jasmine.any(Question));
    expect(question.id).toEqual(2);
  });
});
