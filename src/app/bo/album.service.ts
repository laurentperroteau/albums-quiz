import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { UserService } from '../core/services/user.service';

import { Album, Ref, UserAlbums } from './db.model';
import { UserAlbumsService } from './userAlbums.service';

// TODO: créer un classe parente qui match les erreur
@Injectable()
export class AlbumsService {
  node = 'albums';
  user: firebase.User;

  albums$: FirebaseListObservable<Album[]>;

  constructor(
    private _fb: FormBuilder,
    private _db: AngularFireDatabase,
    private _userService: UserService,
    private _usersAlbumService: UserAlbumsService,
  ) {
    // this.user = this._userService.user;
    this.albums$ = this._db.list('/' + this.node);
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

  getOne(ref: Ref): FirebaseObjectObservable<Album> {
    return this._db.object(`${this.node}/${ref}`)
      .map(rawAlbum => {
        return new Album(rawAlbum);
      }) as FirebaseObjectObservable<Album>;
  }

  getList(): FirebaseListObservable<Album[]> {
    return this.albums$;
  }

  getListByRefs(refs: Ref[]) {
    console.log(refs);
    return this.albums$
      .map(as => as.filter(a => refs.indexOf(a.$key) !== -1))
      // Filter ne fonctionne pas, il renvoi la liste complète
      /*.flatMap(data => data)
      .filter((a: Album) => {
        console.log(a);
        return refs.indexOf(a.$key) !== -1
      })*/;
  }
}
