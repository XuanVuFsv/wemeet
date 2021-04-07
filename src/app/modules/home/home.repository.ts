import { Injectable } from '@angular/core';
import { Repository as BaseRepository } from '@data/repositories/repository';

export interface IHome {
  id: string;
}

@Injectable({ providedIn: 'root' })
export class HomeRepository extends BaseRepository<IHome> {
  resourceType(): string {
    return '/home';
  }
}
