import { Component } from '@angular/core';

@Component({
  selector: 'app-bo-home',
  template: `
    <h2>Liste des albums</h2>
    <app-album-list [baseLink]="['/bo', 'edit']"></app-album-list>
    <!--<app-bo-question></app-bo-question>-->
    <button [routerLink]="['/bo', 'edit', 'new']" md-fab color="primary">
      <md-icon>add</md-icon>
    </button>
  `,
})
export class BoHomeComponent {

}
