import * as _ from 'lodash';

import { Component, Input, EventEmitter, Output, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Album } from '../db.model';

@Component({
  selector: 'app-bo-album-form',
  template: `
    <div *ngIf="album">
      <form [formGroup]="album.form">
        <input formControlName="name"/>
        <input formControlName="year"/>
        <button (click)="submit()">{{ submitLabel }}</button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush // TODO: a confirmer
})
export class BoAlbumFormComponent implements OnInit, OnChanges {
  @Input() isNew: string;
  @Input() album: Album;
  @Output() onUpdate: EventEmitter<Album> = new EventEmitter(); // return new object

  submitLabel = 'Créer';

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    if (this.isNew === 'new') {
      console.log('album', this.album);
      this.album = new Album();
      this.album.createForm(this._fb);
    } else {
      // TODO: désactive le bouton en attendant l'obs
      this.submitLabel = 'Actualiser';
    }
  }

  ngOnChanges(changes) {
    if (this.isNew !== 'new' && changes.album && this.album) {
      console.log('album', this.album);
      if (!_.get(this.album, 'form')) {
        this.album.createForm(this._fb);
      }
    }
  }

  submit() {
    this.onUpdate.emit(this.album);
  }
}
