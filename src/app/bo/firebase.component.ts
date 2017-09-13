import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlbumsService } from './album.service';
import { UserAlbumsService } from './userAlbums.service';
import { UserService } from '../core/services/user.service';
import { Album } from './models/album.model';
import { UserAlbums } from './models/user-albums.model';
import { Ref } from '../core/models/db.model';

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
    <h3>Albums by user :</h3>
    <ul>
      <li *ngFor="let album of albumsByUser$ | async ">
        <a (click)="editAlbum(album.$key)">
          {{ album.name }} ({{ album.year }})
        </a>
      </li>
    </ul>
    <h2>Album form</h2>
    <app-bo-album-form
      [album]="(albumToUpdate$ | async)"
      (onUpdate)="onUpdate($event)">
    </app-bo-album-form>
  `,
})
export class FirebaseComponent {
  db: AngularFireDatabase;

  posts: FirebaseListObservable<Posts[]>;
  rootObject: FirebaseObjectObservable<any>;
  // Album db
  albums$: FirebaseListObservable<Album[]>;
  albumsByUser$: any;
  userAlbums$: FirebaseListObservable<any[]>;
  albumToUpdate$: FirebaseObjectObservable<Album>;

  albumCreated: Ref;

  constructor(
    private _db: AngularFireDatabase,
    private _userService: UserService,
    private _albumService: AlbumsService,
    private _usersAlbumsService: UserAlbumsService,
  ) {
    this.posts = this._db.list('/posts');
    // this.posts.subscribe(r => console.log(r));

    this.rootObject = this._db.object('/root_object2');
    // this.rootObject.subscribe(r => console.log(r));

    this.albums$ = this._db.list('/albums');
    // this.userAlbums$ = this._db.list('/' + UserAlbums.node);
  }

  /*addAlbum() {
    this.albums$.push({name: 'In the court of Crimson King', year: 1970}).then(test => {
      console.log(test);
    });
  }*/

  addUserToFirstAlbum() {
    const newAlbum = new Album({ name: 'The Grand Wazoo', year: 1973 });
    this._albumService.add(newAlbum);
  }

  getAlbumsByUser() {
    // TODO: ne pas subscribe dans component mais mapper le résultat
    this._usersAlbumsService.getAlbumnsRefsConnectedUser().subscribe((u: UserAlbums[]) => {
      this.albumsByUser$ = this._albumService.getListByRefs(u.map(a => a.$key));
    })
  }

  getAlbumnsConnectedUser() {
    // TODO: voir créer un services parent pour les albumns (éviter circular dependencies)
    // this._superAlbumService.getListByConnectedUser().subscribe(r => console.log(r))
  }

  addPost() {
    this.posts.push({body: 'mon nouveau body', starCount: 4})
  }

  addStar() {
    this.posts.update(this.posts[0].$key, {starCount: ++this.posts[0].starCount});
  }

  editAlbum(key) {
    this.albumToUpdate$ = this._albumService.getOne(key);
    console.log(this.albumToUpdate$);
    // this.albumToUpdate$.subscribe(a => console.log(a));
  }

  onUpdate(updatedAlbum: Album) {
    if (this.albumToUpdate$) {
      this.albumToUpdate$.update(updatedAlbum); // update method include in Obs replace extra service
    } else {
      // this._albumService.create(updatedAlbum); TODO
    }
  }

  login() {
    this._userService.login();
  }

  logout() {
    this._userService.logout();
  }
}
