import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { MdToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';

// app.module.ts
export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/front',
    pathMatch: 'full'
  },
  {
    path: 'front',
    loadChildren: './front/front.module#FrontModule',
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,

    RouterModule,
    RouterModule.forRoot(ROUTES),

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(ROUTES),
    MdToolbarModule
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
