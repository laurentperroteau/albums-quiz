import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuestionComponent } from './question/question.component';
import { QuestionService } from './services/question.service';

// routes
export const ROUTES: Routes = [
  { path: '', component: QuestionComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    QuestionComponent
  ],
  providers: [QuestionService]
})
export class FrontModule { }
