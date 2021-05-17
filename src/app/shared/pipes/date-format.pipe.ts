import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(date: Date | string, format: string = 'YYYY/MM/DD HH:mm:ss'): string {
    if (date) {
      return dayjs(date).format(format);
    }
    return '';
  }
}
