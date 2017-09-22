import * as urljoin from 'url-join';
import * as _ from 'lodash';

import { Observable  } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Ref } from '../';

import { Question } from '../../bo/models/question.model';
import { UserService } from '../';

// TODO: créer un classe parente qui match les erreur
@Injectable()
export class QuestionService {
  node = 'questions';
  user$: Observable<firebase.User>;

  questions$: FirebaseListObservable<Question[]>;

  constructor(
    private _fb: FormBuilder,
    private _db: AngularFireDatabase,
    private _userService: UserService,
  ) {
    this.user$ = this._userService.user$;
    this.questions$ = this._db.list('/' + this.node);
  }

  // TODO: move to parent class
  resolvePromise(promise) {
    promise.then(
      (success) => {
        if (success instanceof Observable) {
          success.subscribe(msj => {
            console.log('SUCCESS', msj)
          })
        } else {
          console.log('SUCCESS', success)
        }
      },
      (error) => {
        if (error instanceof Observable) {
          error.subscribe(msj => {
            console.log('ERROR', msj)
          })
        } else {
          console.log('ERROR', error)
        }
      }
    )
  }

  publishRequest(obs) {
    obs.subscribe(
      (success) => {
          console.log('SUCCESS', success)
      },
      (error) => {
        console.log('ERROR', error)
      }
    );

    return obs;
  }

  add(question: Question): Observable<string> {
    // Add question...
    const newQuestion: Question = question.updateFromFormAndReturnIt();

    const test = this.user$.flatMap(u => {
      newQuestion.userRef = u.uid;

      const add$ =
        this.questions$.push(newQuestion).then(
          (newQuestionRef: firebase.database.ThenableReference) => {
            return new Question(_.merge({$key: newQuestionRef.key}, newQuestion));
            /*return this.setToAlbum(
              new Question(_.merge({$key: newQuestionRef.key}, newQuestion))
            );*/
          },
          error => Promise.resolve(error)
        );

      this.publishRequest(add$);
      return add$;
    });

    return this.publishRequest(test);
  }

  /*setToAlbum(question: Question): firebase.Promise<void> {
    return this._db.object(
      urljoin(
        this.nodeAlbumRelation,
        question.albumRef,
        question.$key,
      )
    ).set(question.label);
  }*/

  getOne(ref: Ref): FirebaseObjectObservable<Question> {
    const question$ = this._db.object(`${this.node}/${ref}`)
      .map(rawQuestion => {
        const question = new Question(rawQuestion);
        question.setObs(question$);
        return question;
      }) as FirebaseObjectObservable<Question>;

    return question$;
  }

  getQuestionsByAlbum(albumRef: Ref) {
    return this._db.list('/' + this.node, {
      query: {
        orderByChild: 'albumRef',
        equalTo: albumRef,
      }
    });
  }
}
