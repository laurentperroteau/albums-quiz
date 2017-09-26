import { Observable } from 'rxjs/Rx';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AlbumsService } from '../../core/services/album.service';
import { Album } from '../../core/models/album.model';

@Component({
  selector: 'app-front-album',
  template: `
    <h2>Liste des question</h2>
    <app-question-list
      [albumRef]="(paramRef | async)"
      [baseLink]="['question']">
    </app-question-list>
  `,
})
export class FrontAlbumComponent implements OnInit {
  paramRef: Observable<string>;
  album$: Observable<Album>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _albumService: AlbumsService
  ) {}

  ngOnInit(): void {
    this.paramRef = this._route.params.map((params: Params) => params['refAlbum']);

    this.album$ = this.paramRef.flatMap(param => {
      return this._albumService.getOne(param);
    });
  }
}
