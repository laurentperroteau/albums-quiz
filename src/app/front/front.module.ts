import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MdButtonModule, MdIconModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { FrontHomeComponent } from './home/home.component';


// routes
export const ROUTES: Routes = [
  { path: '', component: FrontHomeComponent },
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
    FrontHomeComponent,
  ],
  providers: []
})
export class FrontModule {}
