import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RequestService } from './services/request.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { QuestionService } from './services/question.service';
import { AlbumsService } from './services/album.service';
import { UserAlbumsService } from './services/userAlbums.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [],
  providers: [
    RequestService,
    AuthGuard,
    UserService,
    QuestionService,
    AlbumsService,
    UserAlbumsService,
  ],
  exports: []
})
export class CoreModule { }
