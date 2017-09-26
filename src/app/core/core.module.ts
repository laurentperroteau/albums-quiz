import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    UserService,
    QuestionService,
    AlbumsService,
    UserAlbumsService,
  ],
  exports: []
})
export class CoreModule { }
