import { Component } from '@angular/core';

import * as firebase from 'firebase/app'

import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  template: `
    <!-- TODO: app-shell directive -->
    <mat-toolbar color="primary">
      <span e2e="title">{{ title }}</span>
      <span class="example-spacer"></span>
        <button routerLink="/quiz" routerLinkActive="mat-accent" mat-raised-button color="primary">
          Répondre aux questions
        </button>
        &nbsp;
        <!-- TODO: add guard -->
        <button *ngIf="isLogin()" routerLink="/bo" routerLinkActive="mat-accent" mat-raised-button color="primary">
          Créer des questions
        </button>
        &nbsp;
        <div *ngIf="isLogin()">Bonjour {{ user.displayName }}</div>
        <button *ngIf="!isLogin()" mat-raised-button color="primary" (click)="login()">
          Login
        </button>
        &nbsp;
        <button *ngIf="isLogin()" mat-raised-button color="primary" (click)="logout()">
          Logout
        </button>
    </mat-toolbar>
    <div>
      <router-outlet></router-outlet>
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

  isLogin() {
    return this.user && !this.user.isAnonymous;
  }
}
