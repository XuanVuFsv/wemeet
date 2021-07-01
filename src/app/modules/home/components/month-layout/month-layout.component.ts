import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as dayjs from 'dayjs';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

@Component({
  selector: 'app-month-layout',
  templateUrl: './month-layout.component.html',
  styleUrls: ['./month-layout.component.scss']
})
export class MonthLayoutComponent implements OnInit, OnChanges {
  @Input() monthSelect: Date = new Date();
  dayOfWeek: string[] = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
  colors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'violet', 'rose', 'gray'];
  meetingDetail: any;

  // monthData: any[] = [
  //   {
  //     week: 17,
  //     data: [
  //       {
  //         day: null,
  //         schedule: []
  //       },
  //       {
  //         day: null,
  //         schedule: []
  //       },
  //       {
  //         day: null,
  //         schedule: []
  //       },
  //       {
  //         day: null,
  //         schedule: []
  //       },
  //       {
  //         day: null,
  //         schedule: []
  //       },
  //       {
  //         day: 1,
  //         schedule: []
  //       },
  //       {
  //         day: 2,
  //         schedule: []
  //       }
  //     ]
  //   },
  //   {
  //     week: 18,
  //     data: [
  //       {
  //         day: 3,
  //         schedule: []
  //       },
  //       {
  //         day: 4,
  //         schedule: []
  //       },
  //       {
  //         day: 5,
  //         schedule: []
  //       },
  //       {
  //         day: 6,
  //         schedule: []
  //       },
  //       {
  //         day: 7,
  //         schedule: [
  //           {
  //             start: 'Tue May 11 2021 08:30:00 GMT+0700 (Indochina Time)',
  //             end: 'Tue May 11 2021 09:20:00 GMT+0700 (Indochina Time)',
  //             minute_of_day: 510,
  //             meeting_time: 50,
  //             color: this.colors[Math.floor(Math.random() * this.colors.length)],
  //             name: 'Phân tích thực trạng công ty cho dự án'
  //           },
  //           {
  //             start: 'Tue May 11 2021 09:30:00 GMT+0700 (Indochina Time)',
  //             end: 'Tue May 11 2021 11:00:00 GMT+0700 (Indochina Time)',
  //             minute_of_day: 570,
  //             meeting_time: 90,
  //             color: this.colors[Math.floor(Math.random() * this.colors.length)],
  //             name: 'Báo cáo tiến độ khảo sát lần 1'
  //           },
  //           {
  //             start: 'Tue May 11 2021 13:40:00 GMT+0700 (Indochina Time)',
  //             end: 'Tue May 11 2021 14:30:00 GMT+0700 (Indochina Time)',
  //             minute_of_day: 820,
  //             meeting_time: 50,
  //             color: this.colors[Math.floor(Math.random() * this.colors.length)],
  //             name: 'Báo cáo tiến độ tổng quan dự án lần 1'
  //           }
  //         ]
  //       },
  //       {
  //         day: 8,
  //         schedule: []
  //       },
  //       {
  //         day: 9,
  //         schedule: []
  //       }
  //     ]
  //   },
  //   {
  //     week: 19,
  //     data: [
  //       {
  //         day: 10,
  //         schedule: []
  //       },
  //       {
  //         day: 11,
  //         schedule: []
  //       },
  //       {
  //         day: 12,
  //         schedule: []
  //       },
  //       {
  //         day: 13,
  //         schedule: []
  //       },
  //       {
  //         day: 14,
  //         schedule: []
  //       },
  //       {
  //         day: 15,
  //         schedule: []
  //       },
  //       {
  //         day: 16,
  //         schedule: []
  //       }
  //     ]
  //   },
  //   {
  //     week: 20,
  //     data: [
  //       {
  //         day: 17,
  //         schedule: []
  //       },
  //       {
  //         day: 18,
  //         schedule: [
  //           {
  //             start: 'Tue May 11 2021 09:15:00 GMT+0700 (Indochina Time)',
  //             end: 'Tue May 11 2021 10:00:00 GMT+0700 (Indochina Time)',
  //             minute_of_day: 555,
  //             meeting_time: 45,
  //             color: this.colors[Math.floor(Math.random() * this.colors.length)],
  //             name: 'Chốt giá, phương án tài chính'
  //           },
  //           {
  //             start: 'Tue May 11 2021 16:30:00 GMT+0700 (Indochina Time)',
  //             end: 'Tue May 11 2021 17:50:00 GMT+0700 (Indochina Time)',
  //             minute_of_day: 990,
  //             meeting_time: 80,
  //             color: this.colors[Math.floor(Math.random() * this.colors.length)],
  //             name: 'Thảo luận thiết kế ERD'
  //           }
  //         ]
  //       },
  //       {
  //         day: 19,
  //         schedule: []
  //       },
  //       {
  //         day: 20,
  //         schedule: []
  //       },
  //       {
  //         day: 21,
  //         schedule: []
  //       },
  //       {
  //         day: 22,
  //         schedule: []
  //       },
  //       {
  //         day: 23,
  //         schedule: []
  //       }
  //     ]
  //   },
  //   {
  //     week: 21,
  //     data: [
  //       {
  //         day: 24,
  //         schedule: []
  //       },
  //       {
  //         day: 25,
  //         schedule: []
  //       },
  //       {
  //         day: 26,
  //         schedule: []
  //       },
  //       {
  //         day: 27,
  //         schedule: []
  //       },
  //       {
  //         day: 28,
  //         schedule: []
  //       },
  //       {
  //         day: 29,
  //         schedule: []
  //       },
  //       {
  //         day: 30,
  //         schedule: []
  //       }
  //     ]
  //   },
  //   {
  //     week: 17,
  //     data: [
  //       {
  //         day: 31,
  //         schedule: []
  //       },
  //       {
  //         day: null,
  //         schedule: []
  //       },
  //       {
  //         day: null,
  //         schedule: []
  //       },
  //       {
  //         day: null,
  //         schedule: []
  //       },
  //       {
  //         day: null,
  //         schedule: []
  //       },
  //       {
  //         day: null,
  //         schedule: []
  //       },
  //       {
  //         day: null,
  //         schedule: []
  //       }
  //     ]
  //   }
  // ];

  monthData: any[] = [];

  constructor() {}

  ngOnInit(): void {
    for (const week of this.monthData) {
      for (const dayData of week.data) {
        dayData.schedule = dayData.schedule.map((data: any) => ({
          ...data,
          start_time: dayjs(data.start).format('HH:mm'),
          end_time: dayjs(data.end).format('HH:mm'),
          day: dayjs(data.start).format('dddd, D MMMM')
        }));
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.monthSelect) {
      this.monthData = [];
      let daysInMonth = dayjs(this.monthSelect).daysInMonth();
      let firstDay = new Date(this.monthSelect.getFullYear(), this.monthSelect.getMonth(), 1);
      let firstDayOfWeek = dayjs(firstDay).day();
      let countDay = 0;

      for (let weekOfMonth = 0; weekOfMonth < 6; weekOfMonth++) {
        let weekData = {
          week: dayjs(firstDay)
            .add(weekOfMonth * 7, 'day')
            .week(),
          data: []
        };

        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          if ((dayOfWeek + 1 >= firstDayOfWeek || countDay) && countDay < daysInMonth) {
            countDay++;
            let dataDay = {
              day: countDay,
              dayOfWeek: dayOfWeek,
              schedule: []
            };
            weekData.data.push(dataDay);
          } else {
            weekData.data.push({
              day: null,
              dayOfWeek: null,
              schedule: []
            });
          }
        }
        this.monthData.push(weekData);
        if (countDay >= daysInMonth) {
          break;
        }
      }
    }
  }

  changeMeetingDetail(detail) {
    this.meetingDetail = detail;
  }
}
