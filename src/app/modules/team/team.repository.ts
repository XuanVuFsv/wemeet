import { Injectable } from '@angular/core';
import { Repository as BaseRepository } from '@data/repositories/repository';

export interface ITeam {
  id: string;
  name: string;
  avatar: string;
  leader: any;
  description: string;
  created_at: string;
  users: IUser[]
}
export interface IUser {
  id: string,
  email: string;
  fullname: string;
  nickname: string;
  position: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class TeamRepository extends BaseRepository<ITeam> {
  resourceType(): string {
    return '/team';
  }
}
