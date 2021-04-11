import { Injectable } from '@angular/core';
import { Repository as BaseRepository } from '@data/repositories/repository';

export interface ITodo {
  _id: string;
  name: string;
  age: number;
  country: string;
}

@Injectable({ providedIn: 'root' })
export class TodoRepository extends BaseRepository<ITodo> {
  resourceType(): string {
    return '/todo';
  }
}
