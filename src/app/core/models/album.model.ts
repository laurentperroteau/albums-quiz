import * as _ from 'lodash';

import { WithModelFactory } from './model-fatory';
import { BaseNode } from './db.model';

export class Album extends WithModelFactory(BaseNode) {
  name: string;
  year: number;

  constructor(objRaw?: Partial<Album>) {
    super();

    const defaultObj: Partial<Album>  = {
      name: '',
      year: null,
    };

    _.merge(this, defaultObj, objRaw);
  }
}
