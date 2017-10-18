import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { BoHomeComponent } from './home/home.component';

import { BoAlbumComponent } from './album/album.component';
import { BoAlbumFormComponent } from './album/album-form.component';

import { BoQuestionComponent } from './question/question.component';
import { BoQuestionFormComponent } from './question/question-form.component';


// routes
export const ROUTES: Routes = [
  { path: '', component: BoHomeComponent },
  { path: 'edit/:refAlbum', component: BoAlbumComponent },
  { path: 'edit/:refAlbum/question/edit/:refQuestion', component: BoQuestionComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,

    // Lib
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    BoHomeComponent,
    BoAlbumFormComponent,
    BoAlbumComponent,
    BoQuestionComponent,
    BoQuestionFormComponent,
  ]
})
export class BoModule { }
