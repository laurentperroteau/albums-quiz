import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserAlbums } from '../models/user-albums.model';
import { UserService } from './user.service';


@Injectable()
export class UserAlbumsService {
  readonly node = 'user-albums';
  user$: Observable<firebase.User>;

  constructor(
    private _db: AngularFireDatabase,
    private _userService: UserService,
  ) {
    // this.user$ = this._userService.user$;
  }

  /*getAlbumnsRefsConnectedUser(): AngularFireList<UserAlbums[]> { // TODO: ne retourne pas firebase obj
    return this.user$.flatMap(user => {
      return this._db.list(`${this.node}/${user.uid}`);
    });
  }*/

  // TODO: circular dependencies => test https://angularclass.com/blog/create-a-simple-reactive-store-for-angular-2/
  /*getAlbumnsRefsConnectedUser(): Observable<Album[]> {
    return this.user$.flatMap(u => {
      return this._db.list(`${this.node}/${u.uid}`).flatMap((ua: UserAlbums[]) => {
        return this._albumService.getListByRefs(ua.map(a => a.$key));
      })
    });
  }*/

  /*getAlbumsByConnectedUser(): any {
    console.log(`${this.node}/${this.user.uid}`);
    return this._db.list(`${this.node}/${this.user.uid}`)
      .map((ua: UserAlbums) => {
        console.log('flat', ua);
        return // this._albumService.get(ua.$key);
    });
  }*/
}
