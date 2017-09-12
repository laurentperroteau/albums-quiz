import * as _ from 'lodash';
import { WithModelFactory } from '../core/models/model-fatory';

export type Ref = string | null;

export class FirebaseNode {
  readonly $key?: Ref; // === uid in database
  $exists?: Function;
}

export class BaseNode extends FirebaseNode {
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {
    super();
    // this.createdAt = new Date();
  }
}

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

/*export interface Users {
  [key: string]: User;
}

// User created by google connect
export class User extends BaseNode {
  uid: string;
  displayName: string;
  email: string;
}*/

// GET liste d'album par user => user-albums/userKey
// POST d'une relation => user-albums/userKey/albumKey
export interface UserAlbums extends BaseNode {
  $value: string; // album title
}

/* Exemple d'interface de array/object (de lodash)
interface List<T> {
  [index: number]: T;
  length: number;
}

interface Dictionary<T> {
  [index: string]: T;
}

interface NumericDictionary<T> {
  [index: number]: T;
}*/
