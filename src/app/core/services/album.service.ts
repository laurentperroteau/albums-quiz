import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash'

import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { RequestService } from './request.service';
import { UserService } from './user.service';
import { UserAlbumsService } from './userAlbums.service';

import { Ref } from '../models/db.model';
import { Album } from '../models/album.model';

@Injectable()
export class AlbumsService {
  node = 'albums';
  nodeUserRelation = 'user-albums';
  user$: Observable<firebase.User>;

  albums$: AngularFireList<Album[]>;

  constructor(
    private _fb: FormBuilder,
    private _db: AngularFireDatabase,
    private _requestService: RequestService,
    private _userService: UserService,
    private _usersAlbumService: UserAlbumsService,
  ) {
    this.user$ = this._userService.user$;
    this.albums$ = this._db.list('/' + this.node);
  }

  add(album: Album): Observable<string> {
    // Add question...
    const newAlbum: Album = album.updateFromFormAndReturnIt();

    const onGettingUser$ = this.user$.flatMap(u => {
      newAlbum.userRef = u.uid;

      const onAdding =
        this.albums$.push([newAlbum]).then(
          (newQuestionRef: firebase.database.ThenableReference) => {
            return new Album(_.merge({$key: newQuestionRef.key}, newAlbum));
          },
          error => Promise.resolve(error)
        );

      return this._requestService.sharePromise(onAdding);
    });

    return this._requestService.shareObs(onGettingUser$);
  }

  setToUser(album: Album, newAlbumRef: firebase.database.ThenableReference): Observable<null> {
    return this.user$.flatMap(u => {
      return this._db.object(`${this.nodeUserRelation}/${u.uid}/${newAlbumRef.key}`).set(album.name)
    });
  }

  getOne(ref: Ref): Observable<Album> {
    const album$ = this._db.object(`${this.node}/${ref}`)
      .valueChanges()
      .map(rawAlbum => {
        const album = new Album(rawAlbum);
        album.setObs(album$);
        return album;
      });

    return album$;
  }

  getList(): Observable<Album[]> {
    return this.albums$.valueChanges();
  }

  getListByUser(): Observable<Album[]> {
    return this.user$.flatMap(u => {
      const opt = (ref) => {
        if (!u.uid) {
          return;
        } else {
          return ref.orderByChild(('userRef' as keyof Album)).equalTo(u.uid);
        }
      };
      return this._db.list('/' + this.node, opt).valueChanges();
    });
  }
}
