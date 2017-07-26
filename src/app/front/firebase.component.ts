import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Album, Albums, User, UserAlbums } from './db.model';

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
    <ul>
      <!--<li class="text" *ngFor="let item of posts | async">
        {{item.$value}}
      </li>
    </ul>-->
      <div> user : {{ (user | async)?.uid }}</div>
      <button (click)="login()">Login</button>
      <button (click)="logout()">Logout</button>
      <br/>
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
      <button (click)="addAlbum()">Add album</button>
      <button (click)="addUserToFirstAlbum()">Add user to first album</button>
  `,
})
export class FirebaseComponent {
  user: Observable<firebase.User>;
  posts: FirebaseListObservable<Posts[]>;
  rootObject: FirebaseObjectObservable<any>;
  // Album db
  albums: FirebaseListObservable<Album[]>;
  userAlbums: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.posts = db.list('/posts');
    // this.posts.subscribe(r => console.log(r));

    this.rootObject = db.object('/root_object2');
    // this.rootObject.subscribe(r => console.log(r));

    this.albums = db.list('/' + Albums.node);
    this.userAlbums = db.list('/' + UserAlbums.node);
  }

  addAlbum() {
    this.albums.push({name: 'In the court of Crimson King', year: 1970}).then(test => {
    console.log(test);
    });
  }

  addUserToFirstAlbum() {
    this.albums.push({name: 'In the court of Crimson King', year: 1970}).then((ref: firebase.database.ThenableReference) => {
      this.user.subscribe((u: User) => {
        // TODO: a suivre, comment ajouter une relation
        // this.userAlbums.update(u.uid, ref.key);
      })
    });
  }

  addPost() {
    this.posts.push({body: 'mon nouveau body', starCount: 4})
  }

  addStar() {
    this.posts.update(this.posts[0].$key, {starCount: ++this.posts[0].starCount});
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
