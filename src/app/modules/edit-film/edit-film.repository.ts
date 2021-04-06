import { Injectable } from '@angular/core';
import { Repository as BaseRepository } from '@data/repositories/repository';

export interface IVideo {
  id: string;
}

@Injectable({ providedIn: 'root' })
export class EditVideoRepository extends BaseRepository<IVideo> {
  resourceType(): string {
    return '/edit-video';
  }
}
