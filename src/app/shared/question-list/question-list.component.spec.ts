import { Observable } from 'rxjs/Rx';

import { TestBed, async, inject } from '@angular/core/testing';

import * as firebase from 'firebase/app';

import { QuestionListComponent } from './question-list.component';
import { QuestionService } from '../../core/services/question.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Album } from '../../core/models/album.model';
import { Ref } from '../../core/models/db.model';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';

class QuestionServiceStub {
  node = 'questions';
  user$: Observable<firebase.User>;

  constructor() {
    this.user$ = Observable.of({
      displayName: 'Pierre Martin'
    })
  }

  /*getListByAlbum(albumRef: Ref) {
    return Observable.of([
      new Album({ name: 'Fun House', year: 1970 }),
      new Album({ name: 'Pets Sounds', year: 1966 }),
    ]);
  }*/
}

export const QuestionServiceStubProvider = {
  provide: QuestionService,
  useClass: QuestionServiceStub,
};

describe('QuestionListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        AppModule,
        // MdToolbarModule,
        // MdButtonModule,
      ],
      declarations: [
        QuestionListComponent
      ],
      providers: [
        // No need FormBuilder because ReactiveFormsModule ???
        {provide: APP_BASE_HREF, useValue: '/'},
        QuestionService
      ]
    }).compileComponents();
  }));

  xit('should create the component', async(() => {
    const fixture = TestBed.createComponent(QuestionListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  xit(`should have as title 'Albums qui'`, inject([QuestionService], (_questionService: QuestionService) => {
    const fixture = TestBed.createComponent(QuestionListComponent);
    const app = fixture.debugElement.componentInstance;
    app.albumRef = 'testAlbumRef';
    console.log(QuestionService);
    /*spyOn(QuestionService, 'getListByAlbum')
      .and
      .returnValue(
        Observable.of([
          new Album({ name: 'Fun House', year: 1970 }),
          new Album({ name: 'Pets Sounds', year: 1966 }),
        ]).delay(2000)
      );
    console.log(fixture.debugElement.query(By.css('ul li')));*/
    expect(app.title).toEqual('Albums quiz');
  }));
});
