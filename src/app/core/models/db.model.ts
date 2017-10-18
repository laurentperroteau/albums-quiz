export type Ref = string | null;

export class FirebaseNode {
  // readonly $key?: Ref; // === uid in database
  // $exists?: Function;
  key: string | null;
  /**
   * TODO:
   * - ne renvoir plus $key => https://github.com/angular/angularfire2/blob/master/docs/version-5-upgrade.md#moving-away-from-key-and-value
   * - reset base, ajouter key pour chaque nouvelle item, le passé par url (plus jolie url)
   */
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
