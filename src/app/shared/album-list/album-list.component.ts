import { Component } from '@angular/core';

import { AlbumsService } from '../../core/services/album.service';
import { UserAlbumsService } from '../../core/services/userAlbums.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { Album } from '../../core/models/album.model';

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

  constructor(
    private _albumService: AlbumsService,
  ) {
    this.getAlbumsByUser();
  }

  getAlbumsByUser() {
    // TODO: utiliser user-albums resource (avec juste le nom)
    this.albumsByUser$ = this._albumService.getListRefsConnectedUser();
  }
}
