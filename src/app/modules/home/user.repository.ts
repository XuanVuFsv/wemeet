import { Injectable } from '@angular/core';
import { Repository as BaseRepository } from '@data/repositories/repository';

export interface IUser {
  id: string;
}

@Injectable({ providedIn: 'root' })
export class UserRepository extends BaseRepository<IUser> {
  resourceType(): string {
    return '/user';
  }
}
