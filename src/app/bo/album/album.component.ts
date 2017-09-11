import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Album } from '../db.model';
import { AlbumsService } from '../album.service';
import { Observable } from 'rxjs/Observable';

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
  `,
})
export class BoAlbumComponent implements OnInit {
  paramRef: Observable<string>;
  album$: Observable<Album>;
  albumToUpdate$: FirebaseObjectObservable<Album>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _albumService: AlbumsService
  ) {}

  ngOnInit(): void {
    this.paramRef = this._route.params.map((params: Params) => params['ref']);

    this.album$ = this.paramRef.flatMap(param => {
      if (param === 'new') {
        return Observable.of(new Album());
      } else {
        // TODO: l'obs à été ataché à l'album, pas besoin de stocker
        this.albumToUpdate$ = this._albumService.getOne(param);
        return this.albumToUpdate$;
      }
    });
  }

  onUpdate(updatedAlbum: Album) {
    if (this.albumToUpdate$) {
      // TODO: problème, en utilisant update depuis le composant, pas d'accès au service d'ajout de message de success
      // TODO: l'obs à été ataché à l'album, faire updatedAlbum.save()
      this.albumToUpdate$.update(updatedAlbum).then(this._redirectToBo.bind(this)); // update method include in Obs replace extra service
    } else {
      this._albumService.add(updatedAlbum).then(this._redirectToBo.bind(this));
    }
  }

  private _redirectToBo() {
    this._router.navigate(['/bo']);
  }
}
