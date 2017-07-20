import { Injectable } from '@angular/core';
import { Question } from '../question/question.model';

@Injectable()
export class QuestionService {

  constructor() { }

  get() {
    return new Question();
  }
}
