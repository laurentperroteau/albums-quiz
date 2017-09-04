import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserService } from '../core/services/user.service';

import { Album, Ref, UserAlbums } from './db.model';
import { AlbumsService } from './album.service';

@Injectable()
export class UserAlbumsService {
  readonly node = 'user-albums';
  user: firebase.User;

  constructor(
    private _db: AngularFireDatabase,
    private _userService: UserService,
    // private _albumService: AlbumsService,
  ) {
    // this.user = this._userService.get();
    // this._userService.get().subscribe(u => this.user = u);
    // this.userAlbums$ = this._db.list('/' + UserAlbums.node).lift()
  }

  setAlbumToUser(album: Album, newAlbumRef: firebase.database.ThenableReference) {
    this._db.object(`${this.node}/${this.user.uid}/${newAlbumRef.key}`).set(album.name);
  }

  getAlbumnsRefsConnectedUser(): FirebaseListObservable<UserAlbums[]> {
    return this._db.list(`${this.node}/${this.user.uid}`);
  }

  getAlbumsByConnectedUser(): any {
    console.log(`${this.node}/${this.user.uid}`);
    return this._db.list(`${this.node}/${this.user.uid}`)
      .map((ua: UserAlbums) => {
        console.log('flat', ua);
        return // this._albumService.get(ua.$key);
    });
  }
}
