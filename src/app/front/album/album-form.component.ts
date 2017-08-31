import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Album } from '../db.model';

@Component({
  selector: 'app-front-album-form',
  template: `
    <div *ngIf="_album">
      <form [formGroup]="_album.form">
        <input formControlName="name"/>
        <input formControlName="year"/>
        <button (click)="submit()">{{ submitLabel }}</button>
      </form>
    </div>
  `,
})
export class AlbumFormComponent implements OnInit{
  @Input() set album(value: Album) {
    if (value) {
      value.createForm(this._fb);
      this._album = value;
      this.submitLabel = 'Actualiser';
    }
  };
  _album: Album;
  @Output() onUpdate: EventEmitter<Album> = new EventEmitter();

  submitLabel = 'Créer';

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.album = new Album();
  }

  submit() {
    this._album.updateWithFormValueAndDeleteForm();
    this.onUpdate.emit(this._album);
  }
}
