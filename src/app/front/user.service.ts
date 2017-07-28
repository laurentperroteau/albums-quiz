import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserService {

  constructor(private _afAuth: AngularFireAuth) {}

  get(): Observable<firebase.User> {
    return this._afAuth.authState;
  }

  login() {
    this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this._afAuth.auth.signOut();
  }
}
