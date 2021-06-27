import { Injectable } from '@angular/core';
import { Repository as BaseRepository } from '@data/repositories/repository';

export interface IUserManagement {
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserManagementRepository extends BaseRepository<IUserManagement> {
  resourceType(): string {
    return '/user-management';
  }
}
