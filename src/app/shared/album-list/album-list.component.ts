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
        <a (click)="editAlbum(album.$key)">
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
    // TODO: ne pas subscribe dans component mais mapper le résultat
    this._usersAlbumsService.getAlbumnsRefsConnectedUser().subscribe((u: UserAlbums[]) => {
      this.albumsByUser$ = this._albumService.getListByRefs(u.map(a => a.$key));
    });

    // Circular dependencies
    // this.albumsByUser$ = this._usersAlbumsService.getAlbumnsRefsConnectedUser();
  }

  editAlbum(key) {
    this.albumToUpdate$ = this._albumService.getOne(key);
    // this.albumToUpdate$.subscribe(a => console.log(a));
  }
}
