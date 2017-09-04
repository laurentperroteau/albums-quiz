import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { MdToolbarModule, MdButtonModule } from '@angular/material';

import { CodeModule } from './core/core.module';

import { AppComponent } from './app.component';

// app.module.ts
export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/bo',
    pathMatch: 'full'
  },
  {
    path: 'bo',
    loadChildren: './bo/bo.module#BoModule',
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,

    RouterModule,
    RouterModule.forRoot(ROUTES),

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    // Routes
    RouterModule.forRoot(ROUTES),

    // Core
    CodeModule,

    // Lib
    MdToolbarModule,
    MdButtonModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
