import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdRadioModule } from '@angular/material';

import { QuestionComponent } from './question/question.component';
import { QuestionService } from './services/question.service';

import { FirebaseComponent } from './firebase.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: QuestionComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MdRadioModule,
  ],
  declarations: [
    QuestionComponent,
    FirebaseComponent
  ],
  providers: [QuestionService]
})
export class FrontModule { }
