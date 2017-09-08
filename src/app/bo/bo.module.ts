import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MdButtonModule, MdIconModule } from '@angular/material';

import { BoHomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { QuestionFormComponent } from './question/question-form.component';

import { QuestionService } from './services/question.service';
import { UserService } from '../core/services/user.service';
import { AlbumsService } from './album.service';
import { UserAlbumsService } from './userAlbums.service';

import { FirebaseComponent } from './firebase.component';

import { BoAlbumComponent } from './album/album.component';
import { BoAlbumFormComponent } from './album/album-form.component';
import { SharedModule } from '../shared/shared.module';

// routes
export const ROUTES: Routes = [
  { path: '', component: BoHomeComponent },
  { path: 'edit/:ref', component: BoAlbumComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,

    // Lib
    MdButtonModule,
    MdIconModule,
  ],
  declarations: [
    QuestionComponent,
    QuestionFormComponent,
    FirebaseComponent,
    BoHomeComponent,
    BoAlbumFormComponent,
    BoAlbumComponent,
  ],
  providers: [
    UserService,
    AlbumsService,
    UserAlbumsService,
    QuestionService,
  ]
})
export class BoModule { }
