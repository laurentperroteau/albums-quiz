import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserService {
  user$: Observable<firebase.User>;
  user: firebase.User;

  constructor(private _afAuth: AngularFireAuth) {
    this.user$ = this._afAuth.authState;
    this.user$.subscribe(u => {
      console.log('USER', u);
      this.user = u;
    })
  }

  login() {
    this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this._afAuth.auth.signOut();
  }
}
