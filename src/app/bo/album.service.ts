import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as firebase from 'firebase/app';
import { Thenable } from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Ref } from '../core';

import { UserService } from '../core/services/user.service';
import { UserAlbumsService } from './userAlbums.service';

import { Album } from './models/album.model';
import { UserAlbums } from './models/user-albums.model';

// TODO: créer un classe parente qui match les erreur
@Injectable()
export class AlbumsService {
  node = 'albums';
  nodeUserRelation = 'user-albums';
  user$: Observable<firebase.User>;

  albums$: FirebaseListObservable<Album[]>;

  successObs: Observable<string>[];

  constructor(
    private _fb: FormBuilder,
    private _db: AngularFireDatabase,
    private _userService: UserService,
    private _usersAlbumService: UserAlbumsService,
  ) {
    this.user$ = this._userService.user$;
    this.albums$ = this._db.list('/' + this.node);
    // this.userAlbums$ = this._db.list('/' + UserAlbums.node);
  }

  // TODO: rename and move to parent class
  addSuccessPromise(obs$) {
    obs$.then(
      (success) => console.log('SUCCESS', success),
      (error) => console.log('ERROR', error)
    )
  }

  add(album: Album): Thenable<string> {
    // Add album...
    console.log('album push', album.updateFromFormAndReturnIt());
    // TODO: ne fonctionne plus
    const addAndSetUser =
      this.albums$.push(album.updateFromFormAndReturnIt()).then(
        (newAlbumRef: firebase.database.ThenableReference) => {
          // ... and users relation
          return this.setToUser(album, newAlbumRef);
        },
        error => Observable.of(error) // TODO: besoin observable
      );

    this.addSuccessPromise(addAndSetUser);
    return addAndSetUser;
  }

  setToUser(album: Album, newAlbumRef: firebase.database.ThenableReference): Observable<null> {
    return this.user$.flatMap(u => {
      return this._db.object(`${this.nodeUserRelation}/${u.uid}/${newAlbumRef.key}`).set(album.name)
    });
  }

  getOne(ref: Ref): FirebaseObjectObservable<Album> {
    const album$ = this._db.object(`${this.node}/${ref}`)
      .map(rawAlbum => {
        const album = new Album(rawAlbum);
        album.setObs(album$);
        return album;
      }) as FirebaseObjectObservable<Album>;

    return album$;
  }

  getList(): FirebaseListObservable<Album[]> {
    return this.albums$;
  }

  getListRefsConnectedUser(): Observable<Album[]> { // TODO: comment renvoyé un Firebase observable ?
    return this.user$.flatMap(u => {
      return this._db.list(`${this.nodeUserRelation}/${u.uid}`).flatMap((ua: UserAlbums[]) => {
        return this.getListByRefs(ua.map(a => a.$key));
      })
    });
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
