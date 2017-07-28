import * as _ from 'lodash';

export type Ref = string | null;

class FirebaseNode {
  readonly $key?: Ref; // === uid in database
  $exists?: Function;
}

class BaseNode extends FirebaseNode {
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {
    super();
    // this.createdAt = new Date();
  }
}

export const Albums = {
  node: 'albums'
  // [key: string]: Album;
};

export class Album extends BaseNode {
  name: string;
  year: number;

  constructor(objRaw?: Partial<Album>) {
    super();
    _.merge(this, objRaw);
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
export const UserAlbums = {
  node: 'user-albums'
};

export interface UserAlbums extends BaseNode {
  $value: string; // album title
}
