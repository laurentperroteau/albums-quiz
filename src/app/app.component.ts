import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- TODO: app-shell directive -->
    <md-toolbar color="primary">
      <span>{{ title }}</span>
      <span class="example-spacer"></span>
        <button md-button>Répondre aux questions</button>
        <button md-button>Créer des questions</button>
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
