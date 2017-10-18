import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-bo-home',
  template: `
    <div *ngIf="!(isLogin | async)">
      Vous devez vous connecter !
    </div>
    <h2>Liste des albums</h2>
    <app-album-list [baseLink]="['/bo', 'edit']"></app-album-list>
    <button [routerLink]="['/bo', 'edit', 'new']" mat-fab color="primary">
      <mat-icon>add</mat-icon>
    </button>
  `,
})
export class BoHomeComponent {
  isLogin: Observable<boolean> = Observable.of(false);

  constructor(private _userService: UserService) {
    this.isLogin = this._userService.isLogin();
  }
}
