import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';

// TODO: créer type pour firebase.user, afin de ne pas importer tout firebase à chaque fois
@Injectable()
export class UserService {
  user$: Observable<firebase.User>;
  urlToRedirectOnLogin: string; // store the URL so we can redirect after logging in

  constructor(
    private _router: Router,
    private _afAuth: AngularFireAuth) {
    this.user$ = this._afAuth.authState;

    this.isLogin().subscribe(isLogin => {

      // Sign anonymously
      if (!isLogin) {
        this._afAuth.auth.signInAnonymously();
      }
    });
  }

  login() {
    this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      if (this.urlToRedirectOnLogin) {
        // TODO: no tested
        this._router.navigate([this.urlToRedirectOnLogin]).then(() => {
          this.urlToRedirectOnLogin = null;
        });
      }
    })
  }

  isLogin(): Observable<boolean> {
    return this.user$.map(u => u && !u.isAnonymous);
  }

  logout() {
    this._afAuth.auth.signOut().then(() => {
      this._afAuth.auth.signInAnonymously();
      this._router.navigate(['/']);
    });
  }
}
