import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { MatToolbarModule, MatButtonModule } from '@angular/material';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

// app.module.ts
export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/quiz',
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
    MatToolbarModule,
    MatButtonModule,
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
