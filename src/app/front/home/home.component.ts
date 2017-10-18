import { Component } from '@angular/core';

@Component({
  selector: 'app-front-home',
  template: `
    <h2>Liste des albums</h2>
    <app-album-list [baseLink]="['/quiz', 'album']" [restrictByUser]="false"></app-album-list>
    <!--<app-bo-question></app-bo-question>-->
    <!--<button [routerLink]="['/bo', 'edit', 'new']" mat-fab color="primary"><mat-icon>add</mat-icon></button>-->
  `,
})
export class FrontHomeComponent {

}
