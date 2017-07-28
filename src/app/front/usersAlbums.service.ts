import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserService } from './user.service';

import { Album, Albums, Ref, UserAlbums } from './db.model';
import { AlbumService } from './album.service';

@Injectable()
export class UserAlbumsService {
  user: firebase.User;

  constructor(
    private _db: AngularFireDatabase,
    private _userService: UserService,
    private _albumService: AlbumService,
  ) {
    this._userService.get().subscribe(u => this.user = u);
    // this.userAlbums$ = this._db.list('/' + UserAlbums.node).lift()
  }

  setAlbumToUser(album: Album, newAlbumRef: firebase.database.ThenableReference) {
    this._db.object(`${UserAlbums.node}/${this.user.uid}/${newAlbumRef.key}`).set(album.name);
  }

  getAlbumnsRefsConnectedUser(): FirebaseListObservable<UserAlbums[]> {
    return this._db.list(`${UserAlbums.node}/${this.user.uid}`);
  }

  getAlbumnsConnectedUser(): any {
    return this._db.list(`${UserAlbums.node}/${this.user.uid}`)
      .flatMap((ua: UserAlbums) => {
        // TODO
        return this._albumService.get(ua.$key);
    });
  }
}
