import { NgModule } from '@angular/core';

import { UserService } from './services/user.service';
import { QuestionService } from './services/question.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    UserService,
    QuestionService,
  ],
  exports: []
})
export class CoreModule { }
