import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash'

import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { RequestService } from './request.service';
import { UserService } from './user.service';

import { Ref } from '../models/db.model';
import { Album } from '../models/album.model';

@Injectable()
export class AlbumsService {
  node = 'albums';
  user$: Observable<firebase.User>;

  albums$: AngularFireList<Album>;

  constructor(
    private _db: AngularFireDatabase,
    private _requestService: RequestService,
    private _userService: UserService,
  ) {
    this.user$ = this._userService.user$;
    this.albums$ = this._db.list('/' + this.node);
  }

  add(album: Album): Observable<string> {
    // Get raw data album...
    const newAlbum: Album = album.updateFromFormAndReturnIt();

    // ... on getting user
    const onGettingUser$ = this.user$.flatMap(u => {
      // ... add it to album
      newAlbum.userRef = u.uid;

      // ... and push album
      const onAdding =
        this.albums$.push(newAlbum).then(
          () => new Album(newAlbum),
          error => Promise.resolve(error)
        );

      // ... share promise to publish the "push album"
      return this._requestService.sharePromise(onAdding);
    });

    // ... share observable to publish the "get user before push album"
    return this._requestService.shareObs(onGettingUser$);
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
