import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoHomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { QuestionFormComponent } from './question/question-form.component';
import { QuestionService } from './services/question.service';

import { UserService } from './user.service';
import { AlbumsService } from './album.service';
import { UserAlbumsService } from './userAlbums.service';

import { FirebaseComponent } from './firebase.component';

import { AlbumFormComponent } from './album/album-form.component';
import { SharedModule } from '../shared/shared.module';
// routes
export const ROUTES: Routes = [
  { path: '', component: BoHomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
  ],
  declarations: [
    QuestionComponent,
    QuestionFormComponent,
    FirebaseComponent,
    AlbumFormComponent,
    BoHomeComponent,
  ],
  providers: [
    UserService,
    AlbumsService,
    UserAlbumsService,
    QuestionService,
  ]
})
export class BoModule { }
