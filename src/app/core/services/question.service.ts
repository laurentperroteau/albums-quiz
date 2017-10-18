import * as urljoin from 'url-join';
import * as _ from 'lodash';

import { Observable  } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { RequestService } from './request.service';
import { UserService } from './user.service';

import { Question } from '../models/question.model';
import { Ref } from '../models/db.model';

@Injectable()
export class QuestionService {
  node = 'questions';
  user$: Observable<firebase.User>;

  questions$: AngularFireList<Question[]>;

  constructor(
    private _fb: FormBuilder,
    private _db: AngularFireDatabase,
    private _requestService: RequestService,
    private _userService: UserService,
  ) {
    this.user$ = this._userService.user$;
    this.questions$ = this._db.list('/' + this.node);
  }

  add(question: Question): Observable<string> {
    // Add question...
    const newQuestion = question.updateFromFormAndReturnIt();

    const onGettingUser$ = this.user$.flatMap(u => {
      newQuestion.userRef = u.uid;

      const onAdding =
        this.questions$.push(newQuestion).then(
          (newQuestionRef: firebase.database.ThenableReference) => {
            return new Question(_.merge({$key: newQuestionRef.key}, newQuestion));
          },
          error => Promise.resolve(error)
        );

      return this._requestService.sharePromise(onAdding);
    });

    return this._requestService.shareObs(onGettingUser$);
  }

  getOne(ref: Ref): Observable<Question> {
    const question$ = this._db.object(`${this.node}/${ref}`)
      .valueChanges()
      .map(rawQuestion => {
        const question = new Question(rawQuestion);
        question.setObs(question$);
        return question;
      });

    return question$;
  }

  getListByAlbum(albumRef: Ref): Observable<Question[]> {
    return this._db.list(
      '/' + this.node,
      ref => ref.orderByChild(('albumRef' as keyof Question)).equalTo(albumRef)
    ).valueChanges();
  }
}
