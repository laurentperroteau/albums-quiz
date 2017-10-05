import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserService {
  user$: Observable<firebase.User>;

  constructor(
    private _afAuth: AngularFireAuth) {
    this.user$ = this._afAuth.authState;

    // Sign anonymously until login
    this._afAuth.auth.signInAnonymously();
  }

  login() {
    this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  isLogin(): Observable<boolean> {
    return this.user$.map(u => u && !u.isAnonymous);
  }

  logout() {
    this._afAuth.auth.signOut();
  }
}
