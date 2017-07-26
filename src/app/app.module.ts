import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
export class AppModule { }
