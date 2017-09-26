import { BaseNode } from './db.model';

export interface UserAlbums extends BaseNode {
  $value: string; // album title
}
