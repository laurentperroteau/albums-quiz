import * as urljoin from 'url-join';

import { Observable  } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as firebase from 'firebase/app';
import { Thenable } from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Ref } from '../../core';

// import { AlbumQuestionsService } from './userQuestions.service';

// import { AlbumQuestions } from '../models/question-questions.model';
import { Question } from '../models/question.model';
import { UserService } from '../../core';

// TODO: créer un classe parente qui match les erreur
@Injectable()
export class QuestionService {
  node = 'questions';
  nodeAlbumRelation = 'album-questions';
  user$: Observable<firebase.User>;

  questions$: FirebaseListObservable<Question[]>;

  constructor(
    private _fb: FormBuilder,
    private _db: AngularFireDatabase,
    private _userService: UserService,
    // private _usersQuestionService: AlbumQuestionsService,
  ) {
    this.user$ = this._userService.user$;
    this.questions$ = this._db.list('/' + this.node);
    // this.userQuestions$ = this._db.list('/' + AlbumQuestions.node);
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

      const addAndSetUser =
        this.questions$.push(newQuestion).then(
          (newQuestionRef: firebase.database.ThenableReference) => {
            // ... and users relation
            return this.setToUser(newQuestion, newQuestionRef);
          },
          error => Observable.of(error)
        );

      this.resolvePromise(addAndSetUser);
      return addAndSetUser;
    });

    return this.publishRequest(test);
  }

  setToUser(question: Question, newQuestionRef: firebase.database.ThenableReference): Observable<null> {
    return this.user$.flatMap(u => {
      return this._db.object(
        urljoin(
          this.nodeAlbumRelation,
          u.uid,
          newQuestionRef.key
        )
      ).set(question.label)
    });
  }

  getOne(ref: Ref): FirebaseObjectObservable<Question> {
    const question$ = this._db.object(`${this.node}/${ref}`)
      .map(rawQuestion => {
        const question = new Question(rawQuestion);
        question.setObs(question$);
        return question;
      }) as FirebaseObjectObservable<Question>;

    return question$;
  }

  getList(): FirebaseListObservable<Question[]> {
    return this.questions$;
  }

  getListRefsConnectedUser(): Observable<Question[]> {
    return this.user$.flatMap(u => {
      return this._db.list(`${this.nodeAlbumRelation}/${u.uid}`);
    });
  }
}
