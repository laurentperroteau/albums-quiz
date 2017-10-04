import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class RequestService {

  // TODO: voir si possible étendre la promise de FirebaseListObservable pour pouvoir faire un .then().sharePromise()
  // et même chose pour l'observable
  sharePromise(promise) {
    promise.then(
      (success) => {
        if (success instanceof Observable) {
          success.subscribe(msj => {
            console.log('C est UTILISE ?SUCCESS', msj)
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
          console.log('C est UTILISE ? ERROR', error)
        }
      }
    );

    return promise;
  }

  shareObs(request$) {
    const shared$ = request$.share();
    shared$.subscribe(
      this._onSuccess,
      this._onError,
    );

    return shared$;
  }

  private _onSuccess(msg: string) {
    console.log('SUCCESS', msg);
  }

  private _onError(msg: string) {
    console.log('ERROR', msg);
  }
}
