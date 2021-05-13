import { Injectable } from '@angular/core';
import { Repository as BaseRepository } from '@data/repositories/repository';
import * as dayjs from 'dayjs';

export interface IHome {
  id: string;
}

export interface IDayOfWeek {
  id: string;
  datetime: dayjs.Dayjs;
  dayOfWeek: string;
  day: number;
  month: number;
  year: number;
  colorDay: string[];
}

@Injectable({ providedIn: 'root' })
export class HomeRepository extends BaseRepository<IHome> {
  resourceType(): string {
    return '/home';
  }
}
