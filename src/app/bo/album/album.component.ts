import { Observable } from 'rxjs/Rx';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AlbumsService } from '../album.service';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-bo-album',
  template: `
    <h2>
      <span *ngIf="(paramRef | async) === 'new'">Créer</span>
      <span *ngIf="(paramRef | async) !== 'new'">Editer</span>
      un album
    </h2>
    <app-bo-album-form
      [isNew]="(paramRef | async)"
      [album]="(album$ | async)"
      (onUpdate)="onUpdate($event)">
    </app-bo-album-form>
    <br />
    <a [routerLink]="['/bo', 'edit', (paramRef | async), 'question', 'edit', 'new']">
      Ajouter une question
    </a>
  `,
})
export class BoAlbumComponent implements OnInit {
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
      if (param === 'new') {
        return Observable.of(new Album());
      } else {
        return this._albumService.getOne(param);
      }
    });
  }

  onUpdate(updatedAlbum: Album) {
    if (updatedAlbum.obs$) {
      // TODO: problème, en utilisant update depuis le composant, pas d'accès au service d'ajout de message de success
      updatedAlbum.save().then(this._redirectToBo.bind(this));
    } else {
      this._albumService.add(updatedAlbum).then(this._redirectToBo.bind(this));
    }
  }

  private _redirectToBo() {
    this._router.navigate(['/bo']);
  }
}
