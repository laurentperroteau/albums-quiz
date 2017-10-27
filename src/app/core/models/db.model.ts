export type Ref = string | null;

export class FirebaseNode {
  readonly ref: Ref;
}

export class BaseNode extends FirebaseNode {
  createdAt?: Date;
  updatedAt?: Date;
  userRef?: Ref;

  constructor() {
    super();
    // this.createdAt = new Date();
  }
}
