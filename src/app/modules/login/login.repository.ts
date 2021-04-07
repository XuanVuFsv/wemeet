import { Injectable } from '@angular/core';
import { Repository as BaseRepository } from '@data/repositories/repository';

export interface ILogin {
  id: string;
}

@Injectable({ providedIn: 'root' })
export class LoginRepository extends BaseRepository<ILogin> {
  resourceType(): string {
    return '/login';
  }
}
