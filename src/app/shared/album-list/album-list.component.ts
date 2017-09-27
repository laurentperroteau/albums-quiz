import { Observable } from 'rxjs/Rx';

import { Component, Input } from '@angular/core';

import { AlbumsService } from '../../core/services/album.service';
import { UserAlbumsService } from '../../core/services/userAlbums.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Album, RouterLinkHelper } from '../../core';

@Component({
  selector: 'app-album-list',
  template: `
    <ul>
      <li *ngFor="let album of albumsByUser$ | async ">
        <a [routerLink]="linkPush(baseLink, album.$key)">
          {{ album.name }} ({{ album.year }})
        </a>
      </li>
    </ul>
  `,
})
export class AlbumListComponent {
  albumsByUser$: Observable<Album[]>;

  @Input() baseLink: string[];

  linkPush = RouterLinkHelper.push;

  constructor(private _albumService: AlbumsService) {
    this.getAlbumsByUser();
  }

  getAlbumsByUser() {
    // TODO: utiliser user-albums resource (avec juste le nom)
    this.albumsByUser$ = this._albumService.getListRefsConnectedUser();
  }
}
