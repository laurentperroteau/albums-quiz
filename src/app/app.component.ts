import { Observable } from 'rxjs/Rx';

import { Component } from '@angular/core';

import * as firebase from 'firebase/app'

import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  template: `
    <!-- TODO: app-shell directive -->
    <md-toolbar color="primary">
      <span>{{ title }}</span>
      <span class="example-spacer"></span>
        <button routerLink="/quiz" routerLinkActive="mat-accent" md-raised-button color="primary">
          Répondre aux questions
        </button>
        &nbsp;
        <button routerLink="/bo" routerLinkActive="mat-accent" md-raised-button color="primary">Créer des questions</button>
        &nbsp;
        <div *ngIf="user">Bonjour {{ user.displayName }}</div>
        <button md-raised-button color="primary" *ngIf="!user" (click)="login()">
          Login
        </button>
        &nbsp;
        <button md-raised-button color="primary" *ngIf="user" (click)="logout()">
          Logout
        </button>
    </md-toolbar>
    <div *ngIf="user">
      <router-outlet></router-outlet>
    </div>
    <div *ngIf="!user">
      Vous devez vous connecter !
    </div>
  `,
  styles: [
    '.example-spacer { flex: 1 1 auto; }'
  ]
})
export class AppComponent {
  title = 'Albums quiz';
  user: firebase.User;
  isConnected: false;

  constructor(
    private _userService: UserService,
  ) {
    this._userService.user$.subscribe(u => this.user = u);
  }

  login() {
    this._userService.login();
  }

  logout() {
    this._userService.logout();
  }
}
