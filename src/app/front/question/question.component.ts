import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Question, QuestionForm } from './question.model';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-front-question',
  template: `
    <p>question works!</p>
  `,
})
export class QuestionComponent {
  questionForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _questionService: QuestionService
  ) {
    this.createForm();
  }

  createForm() {
    console.log(new QuestionForm(this._fb));
    // TODO: error, ne comprend pas les array, il faut faire un form array (voir pour automatiser
    // this.questionForm = this._fb.group(this._questionService.get());
  }
}
