import { Injectable } from '@angular/core';
import { Repository as BaseRepository } from '@data/repositories/repository';

export interface IReport {
  id: string;
}

@Injectable({ providedIn: 'root' })
export class ReportRepository extends BaseRepository<IReport> {
  resourceType(): string {
    return '/report';
  }
}
