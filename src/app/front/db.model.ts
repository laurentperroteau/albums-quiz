import * as _ from 'lodash';

type UidRelation = string;

class FirebaseNode {
  readonly $key?: string; // === uid in database
  $exists?: Function;
}

export const Albums = {
  node: 'albums'
  // [key: string]: Album;
};

export class Album extends FirebaseNode {
  name: string;
  year: number;

  constructor(objRaw?: Partial<Album>) {
    super();
    _.merge(this, objRaw);
  }
}

export interface Users {
  [key: string]: User;
}

// User created by google connect
export class User extends FirebaseNode {
  uid: string;
  displayName: string;
  email: string;
}

// GET liste d'album par user => user-albums/userKey
// POST d'une relation => user-albums/userKey/albumKey
export const UserAlbums = {
  node: 'user-albums'
}
/*export interface UserAlbums {
  [key: string]: UidRelation;
}*/
