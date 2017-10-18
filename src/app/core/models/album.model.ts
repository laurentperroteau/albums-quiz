import * as _ from 'lodash';

import { WithModelFactory } from './model-fatory';
import { BaseNode, Ref } from './db.model';

export class Album extends WithModelFactory(BaseNode) {
  name: string;
  year: number;
  // userRef: Ref; // TODO: déjà dans baseNode

  constructor(objRaw?: Partial<Album>) {
    super();

    const defaultObj: Partial<Album>  = {
      name: '',
      year: null,
    };

    _.merge(this, defaultObj, objRaw);
  }
}
