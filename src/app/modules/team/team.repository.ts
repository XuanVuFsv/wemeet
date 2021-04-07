import { Injectable } from '@angular/core';
import { Repository as BaseRepository } from '@data/repositories/repository';

export interface ITeam {
  id: string;
}

@Injectable({ providedIn: 'root' })
export class TeamRepository extends BaseRepository<ITeam> {
  resourceType(): string {
    return '/team';
  }
}
