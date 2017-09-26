import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { MdToolbarModule, MdButtonModule } from '@angular/material';

import { CoreModule } from './core/core.module';

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
  },
  {
    path: 'quiz',
    loadChildren: './front/front.module#FrontModule',
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    // CommonModule, // TODO: move to core

    RouterModule,
    RouterModule.forRoot(ROUTES),

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    // Routes
    RouterModule.forRoot(ROUTES),

    // Core
    CoreModule,

    // Lib
    MdToolbarModule,
    MdButtonModule,
  ],
  exports: [
    RouterModule // TODO: move to core
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
