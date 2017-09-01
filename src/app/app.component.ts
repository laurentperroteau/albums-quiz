import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- TODO: app-shell directive -->
    <md-toolbar color="primary">
      <span>{{ title }}</span>
      <span class="example-spacer"></span>
        <button md-raised-button color="primary" routerLink="/bo" routerLinkActive="mat-accent">
          Répondre aux questions
        </button>
        &nbsp;
        <button md-raised-button color="primary">Créer des questions</button>
    </md-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    '.example-spacer { flex: 1 1 auto; }'
  ]
})
export class AppComponent {
  title = 'Albums quiz';
}
