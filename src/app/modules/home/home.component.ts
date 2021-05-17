import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as dayjs from 'dayjs';
import { IDayOfWeek } from './home.repository';
// import * as customParseFormat from 'dayjs/plugin/customParseFormat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  selectedTypeTime: string = 'day';
  weekName: string[] = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  weekData: IDayOfWeek[] = [];
  datetimeTextView: string = '';
  weekSelect: Date = null;
  visibleCalendar: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.goWeek();
  }

  getWeek(startDay: dayjs.Dayjs): IDayOfWeek[] {
    let week: IDayOfWeek[] = [];
    for (let index = 0; index < 7; index++) {
      const datetime: dayjs.Dayjs = startDay.add(index, 'day');
      let objData: IDayOfWeek = {
        id: datetime.format('YYYYMMDD'),
        datetime: datetime,
        dayOfWeek: this.weekName[datetime.day()],
        day: datetime.date(),
        month: datetime.month() + 1,
        year: datetime.year(),
        colorDay: this.getColorDay(datetime)
      };
      week.push(objData);
    }
    this.weekSelect = startDay.toDate();

    return week;
  }

  getColorDay(datetime: dayjs.Dayjs): string[] {
    let toDay: string = dayjs().format('YYYYMMDD');
    if (datetime.format('YYYYMMDD') === toDay) {
      return ['primary', 'teal-400'];
    } else if (datetime.day() === 0) {
      return ['red-400', 'red-300'];
    } else {
      return ['trueGray-500', 'trueGray-400'];
    }
  }

  goWeek(action: string = '') {
    this.visibleCalendar = false;
    let startDayCurrent = this.weekData[0]?.datetime;
    let startDay: dayjs.Dayjs;
    switch (action) {
      case 'next':
        startDay = startDayCurrent.add(7, 'day');
        break;
      case 'prev':
        startDay = startDayCurrent.subtract(7, 'day');
        break;
      case 'select':
        startDay = dayjs(this.weekSelect).startOf('week');
        break;
      default:
        startDay = dayjs().startOf('week');
        break;
    }

    this.weekData = this.getWeek(startDay);
    this.setDatetimeTextView(this.weekData);
  }

  setDatetimeTextView(weekData: IDayOfWeek[]): void {
    if (weekData[0].month !== weekData[6].month) {
      if (weekData[0].year === weekData[6].year) {
        this.datetimeTextView = `${weekData[0].day} Tháng ${weekData[0].month} - ${weekData[6].day} Tháng ${weekData[6].month}, ${weekData[0].year}`;
      } else {
        this.datetimeTextView = `${weekData[0].day} Tháng ${weekData[0].month}, ${weekData[0].year} - ${weekData[6].day} Tháng ${weekData[6].month}, ${weekData[6].year}`;
      }
    } else {
      this.datetimeTextView = `${weekData[0].day} - ${weekData[6].day} Tháng ${weekData[0].month}, ${weekData[0].year}`;
    }
  }

  onOk(e) {
    console.log(e);
  }
}
