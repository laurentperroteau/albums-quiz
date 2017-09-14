import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { MdToolbarModule, MdButtonModule } from '@angular/material';

import { UserService } from './core/services/user.service';

import { AppComponent } from './app.component';
import { Observable } from 'rxjs/Rx';

class UserServiceStub {
  user$: Observable<any>;

  constructor() {
    this.user$ = Observable.of({
      displayName: 'Pierre Martin'
    })
  }
}

export const UserServiceStubProvider = {
  provide: UserService,
  useClass: UserServiceStub,
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireAuthModule,
        MdToolbarModule,
        MdButtonModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        UserServiceStubProvider
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Albums qui'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Albums quiz');
  }));
});
