import { Observable } from 'rxjs/Rx';

import { Component, Input, OnInit } from '@angular/core';

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
export class AlbumListComponent implements OnInit {
  albumsByUser$: Observable<Album[]>;

  @Input() baseLink: string[];
  @Input() restrictByUser = true;

  linkPush = RouterLinkHelper.push;

  constructor(private _albumService: AlbumsService) {
    console.log('this.restrictByUser', this.restrictByUser);
  }

  ngOnInit() {
    this.albumsByUser$ = this.restrictByUser ? this._albumService.getListByUser() : this._albumService.getList();
  }
}
