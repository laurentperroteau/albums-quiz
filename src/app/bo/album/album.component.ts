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
    <h2>Editer un album </h2>
    <app-bo-album-form
      [album]="(album$ | async)"
      (onUpdate)="onUpdate($event)">
    </app-bo-album-form>
  `,
})
export class BoAlbumComponent implements OnInit {
  album$: Observable<Album>;
  albumToUpdate$: FirebaseObjectObservable<Album>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _albumService: AlbumsService
  ) {}

  ngOnInit(): void {
    this.album$ = this._route.params
      .switchMap((params: Params) => {
        this.albumToUpdate$ = this._albumService.getOne(params['ref']);
        return this.albumToUpdate$;
      });
  }

  onUpdate(updatedAlbum: Album) {
    if (this.albumToUpdate$) {
      this.albumToUpdate$.update(updatedAlbum).then(_ => {
        this._router.navigate(['/bo']);
      }); // update method include in Obs replace extra service
    } else {
      // this._albumService.create(updatedAlbum); TODO
    }
  }
}