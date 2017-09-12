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
