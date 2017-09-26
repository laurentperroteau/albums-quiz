import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { MdRadioModule } from '@angular/material';

// import { CoreModule } from '../core/core.module';

import { AlbumListComponent } from './album-list/album-list.component';
import { QuestionListComponent } from './question-list/question-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MdRadioModule,

    // Core
    // CoreModule, // TODO: c'est correct ???, utilser Angury pour vérifier les injections
  ],
  declarations: [
    AlbumListComponent,
    QuestionListComponent,
  ],
  providers: [ /* Push HTTP service in core module */ ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdRadioModule,

    // Core
    // CoreModule,

    // Component shared
    AlbumListComponent,
    QuestionListComponent,
  ]
})
export class SharedModule { }
