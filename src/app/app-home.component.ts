import { Component } from '@angular/core';

import * as firebase from 'firebase/app'

import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="app-home">
      <div *ngIf="isLogin()">Bonjour {{ user.displayName }}</div>
      <button routerLink="/quiz" routerLinkActive="mat-accent" mat-raised-button color="primary">
        Répondre aux questions
      </button>
      <button *ngIf="!isLogin()" mat-raised-button color="primary" (click)="login()">
        Se logguer pour pouvoir créer des questions
      </button>
      &nbsp;
      <button *ngIf="isLogin()" routerLink="/bo" routerLinkActive="mat-accent" mat-raised-button color="primary">
        Créer des questions
      </button>
    </div>
  `,
  styles: [`
    .app-home {
      display: flex;
      height: 100%;
      flex-direction: column;
      padding: 20px;
    }

    .app-home > * {
      margin-bottom: 20px;
    }
  `]
})
export class AppHomeComponent {
  title = 'Albums quiz';
  user: firebase.User;
  isConnected: false;

  constructor(private _userService: UserService,) {
    this._userService.user$.subscribe(u => this.user = u);
  }

  login() {
    this._userService.login();
  }

  isLogin() {
    return this.user && !this.user.isAnonymous;
  }
}
