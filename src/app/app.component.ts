import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <md-toolbar color="primary">
      <span>{{ title }}</span>
    </md-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'Albums quiz';
}
