import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Album, Albums, Ref, UserAlbums } from './db.model';
import { AlbumService } from './album.service';
import { UserAlbumsService } from './usersAlbums.service';
import { UserService } from './user.service';

interface FirebaseItem {
  readonly uid: string;
  $exists: Function;
  $key: string;
}

interface Posts extends FirebaseItem {
  body: string;
  starCount: number;
}

@Component({
  selector: 'app-firebase',
  template: `
    <div> user : Ne fonctionne, il faudrait un page de login avant</div>
    <button (click)="login()">Login</button>
    <button (click)="logout()">Logout</button>
    <br/>firebase
    <ul>
      <li *ngFor="let post of posts | async ">
        post body: {{ post.body }} | stars {{ post.starCount}}
      </li>
    </ul>
    <br/>
    <button (click)="addPost()">Add post</button>
    <button (click)="addStar()">Add start</button>
    <br/>
    root object {{ (rootObject | async)?.name}}
    <hr/>
    <h2>Albums Quiz Database</h2>
    <!--<button (click)="addAlbum()">Add album</button>-->
    <button (click)="addUserToFirstAlbum()">Add user to first album</button>
    <button (click)="getAlbumsByUser()">Get albums ref by current user</button>
    <button (click)="getAlbumnsConnectedUser()">Get albums ref by current user</button>
    <h3>Albums :</h3>
    <ul>
      <li *ngFor="let album of albums$ | async ">
        {{ album.name }} ({{ album.year }})
      </li>
    </ul>
  `,
})
export class FirebaseComponent {
  db: AngularFireDatabase;

  user: Observable<firebase.User>;
  posts: FirebaseListObservable<Posts[]>;
  rootObject: FirebaseObjectObservable<any>;
  // Album db
  albums$: FirebaseListObservable<Album[]>;
  userAlbums$: FirebaseListObservable<any[]>;

  albumCreated: Ref;

  constructor(
    private _db: AngularFireDatabase,
    private _userService: UserService,
    private _albumService: AlbumService,
    private _usersAlbumsService: UserAlbumsService,
  ) {
    this.user = this._userService.get();
    this.posts = this._db.list('/posts');
    // this.posts.subscribe(r => console.log(r));

    this.rootObject = this._db.object('/root_object2');
    // this.rootObject.subscribe(r => console.log(r));

    this.albums$ = this._db.list('/' + Albums.node);
    this.userAlbums$ = this._db.list('/' + UserAlbums.node);
  }

  /*addAlbum() {
    this.albums$.push({name: 'In the court of Crimson King', year: 1970}).then(test => {
      console.log(test);
    });
  }*/

  addUserToFirstAlbum() {
    const newAlbum = {name: 'The Grand Wazoo', year: 1973};
    this._albumService.add(newAlbum);
  }

  getAlbumsByUser() {
    this._usersAlbumsService.getAlbumnsRefsConnectedUser().subscribe(r => console.log(r))
  }

  getAlbumnsConnectedUser() {
    this._usersAlbumsService.getAlbumnsConnectedUser().subscribe(r => console.log(r))
  }

  addPost() {
    this.posts.push({body: 'mon nouveau body', starCount: 4})
  }

  addStar() {
    this.posts.update(this.posts[0].$key, {starCount: ++this.posts[0].starCount});
  }

  login() {
    this._userService.login();
  }

  logout() {
    this._userService.logout();
  }
}
