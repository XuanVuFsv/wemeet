import { Injectable } from '@angular/core';
import { Repository as BaseRepository } from '@data/repositories/repository';

export interface IRoom {
  id: string;
}
@Injectable({ providedIn: 'root' })
export class RoomRepository extends BaseRepository<IRoom> {
  resourceType(): string {
    return '/room';
  }
}
