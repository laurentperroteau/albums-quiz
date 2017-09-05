import { Component } from '@angular/core';

import { AlbumsService } from '../../bo/album.service';
import { UserAlbumsService } from '../../bo/userAlbums.service';
import { Album, UserAlbums } from '../../bo/db.model';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-album-list',
  template: `
    <ul>
      <li *ngFor="let album of albumsByUser$ | async ">
        <a [routerLink]="['/bo', 'edit', album.$key]">
          {{ album.name }} ({{ album.year }})
        </a>
      </li>
    </ul>
  `,
})
export class AlbumListComponent {
  albumsByUser$: Observable<Album[]>;
  albumToUpdate$: FirebaseObjectObservable<Album>;

  constructor(
    private _albumService: AlbumsService,
    private _usersAlbumsService: UserAlbumsService,
  ) {
    this.getAlbumsByUser();
  }

  getAlbumsByUser() {
    this.albumsByUser$ = this._albumService.getListRefsConnectedUser();
  }

  editAlbum(key) {
    // this.albumToUpdate$ = this._albumService.getOne(key);
    // this.albumToUpdate$.subscribe(a => console.log(a));
  }
}
