import { plainToClass } from 'class-transformer';

import { Question, QuestionRadios } from './question.model';

describe('Question model =>', () => {
  const rawQuestion = {
    label: `De quel couleur est le bleu ?`,
    radios: [
      {
        key: 'bleu',
        label: 'Bleu',
      },
      {
        key: 'blanc',
        label: 'Blanc',
      },
      {
        key: 'rouge',
        label: 'Rouge',
      }
    ],
    radioResponse: 'bleu',
  };

  it('should create instance of Question on creation (on using "new")', () => {
    const question = new Question(rawQuestion);

    expect(question).not.toBeUndefined();
    expect(question).toEqual(jasmine.any(Question));
    expect(question.radios[2]).not.toEqual(jasmine.any(QuestionRadios));
    expect(question.radios[2].key).toEqual('rouge');
  });

  it('should create instance nested collection on creation using "class-transformer"', () => {
    const question = plainToClass(Question, rawQuestion);

    expect(question).not.toBeUndefined();
    expect(question).toEqual(jasmine.any(Question));
    expect(question.radios[2]).toEqual(jasmine.any(QuestionRadios));
  });

  it('should not valid response on setting wrong response', () => {
    const question = plainToClass(Question, rawQuestion);
    question.userResponse = new QuestionRadios({key: 'rouge', label: 'Rouge'});

    expect(question.isResponseValid()).toBeFalsy();
  });

  it('should valid response on setting right response', () => {
    const question = plainToClass(Question, rawQuestion);
    question.userResponse = new QuestionRadios({key: 'bleu', label: 'Bleu'});

    expect(question.isResponseValid()).toBeTruthy();
  });
});
