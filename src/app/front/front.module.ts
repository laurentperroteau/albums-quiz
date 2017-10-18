import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { FrontHomeComponent } from './home/home.component';
import { FrontAlbumComponent } from './album/album.component';
import { FrontQuestionComponent } from './question/question.component';
import { FrontQuestionFormComponent } from './question/question-form.component';


// routes
export const ROUTES: Routes = [
  { path: '', component: FrontHomeComponent },
  { path: 'album/:refAlbum', component: FrontAlbumComponent },
  { path: 'album/:refAlbum/question/:refQuestion', component: FrontQuestionComponent },
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
    FrontHomeComponent,
    FrontAlbumComponent,
    FrontQuestionComponent,
    FrontQuestionFormComponent,
  ],
  providers: []
})
export class FrontModule {}
