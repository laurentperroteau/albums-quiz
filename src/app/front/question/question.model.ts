import * as _ from 'lodash';

// TODO: voir déplacer dans shared ou core module ?
// TODO: add test
export class Question {
  id?: number;
  label: string;
  choices: QuestionChoices[] = [];

  constructor(objRaw?: Partial<Question>) {
    const objDefault: Partial<Question> = {
      id: 1,
      choices: []
    };

    _.merge(this, objDefault, objRaw);

    for (let i = 0; i < 3; i++) {
      this.choices.push({label: 'Lorem ipsum'});
    }
  }
}

export class QuestionChoices {
  label: string;
}
