import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdRadioModule } from '@angular/material';

import { AlbumListComponent } from './album-list/album-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdRadioModule,
  ],
  declarations: [
    AlbumListComponent,
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdRadioModule,

    // Component shared
    AlbumListComponent,
  ]
})
// TODO: voir créer core module pour les services entres autres : https://angular.io/guide/ngmodule#the-core-module
export class SharedModule { }
