import { Injectable } from '@angular/core';
import { Repository as BaseRepository } from '@data/repositories/repository';

export interface IBuilding {
  id: string;
}
@Injectable({ providedIn: 'root' })
export class BuildingRepository extends BaseRepository<IBuilding> {
  resourceType(): string {
    return '/building';
  }
}
