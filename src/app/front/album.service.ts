import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserService } from './user.service';

import { Album, Albums, Ref, UserAlbums } from './db.model';
import { UserAlbumsService } from './usersAlbums.service';

@Injectable()
export class AlbumService {
  user: firebase.User;

  albums$: FirebaseListObservable<Album[]>;
  userAlbums$: FirebaseListObservable<any[]>;

  constructor(
    private _db: AngularFireDatabase,
    private _userService: UserService,
    private _usersAlbumService: UserAlbumsService,
  ) {
    this._userService.get().subscribe(u => this.user = u);
    this.albums$ = this._db.list('/' + Albums.node);
    // this.userAlbums$ = this._db.list('/' + UserAlbums.node);
  }

  add(album: Album) {
    // Add album...
    return this.albums$.push(album).then(
      (newAlbumRef: firebase.database.ThenableReference) => {
        // ... and users relation
        this._usersAlbumService.setAlbumToUser(album, newAlbumRef);
      },
      error => console.log(error)
    );
  }

  get(ref: Ref) {
    // TODO: get album by ref
  }

  getAlbums(): FirebaseListObservable<Album[]> {
    return this.albums$;
  }
}
