import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IDayOfWeek } from '../../home.repository';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-week-layout',
  templateUrl: './week-layout.component.html',
  styleUrls: ['./week-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeekLayoutComponent implements OnInit {
  @Input() weekData: IDayOfWeek[] = [];
  toDay: string = dayjs().format('YYYYMMDD');
  meetingDetail: any;
  rangeShow = {
    start: 0,
    end: 24
  };
  hourArr = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'
  ];

  colors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'violet', 'rose', 'gray'];

  listDataWeek = [
    {
      day_of_week: 0,
      schedule: [
        {
          start: 'Tue May 11 2021 09:50:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 11:10:00 GMT+0700 (Indochina Time)',
          minute_of_day: 590,
          meeting_time: 80,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Chuẩn bị tài liệu cho dự án'
        },
        {
          start: 'Tue May 11 2021 13:30:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 14:10:00 GMT+0700 (Indochina Time)',
          minute_of_day: 810,
          meeting_time: 40,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Báo cáo tiến độ chuẩn bị lần 1'
        },
        {
          start: 'Tue May 11 2021 15:00:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 15:30:00 GMT+0700 (Indochina Time)',
          minute_of_day: 900,
          meeting_time: 30,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Thảo luận phương án thiết kế và công nghệ sử dụng'
        }
      ]
    },
    {
      day_of_week: 1,
      schedule: [
        {
          start: 'Tue May 11 2021 08:30:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 09:20:00 GMT+0700 (Indochina Time)',
          minute_of_day: 510,
          meeting_time: 50,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Phân tích thực trạng công ty cho dự án'
        },
        {
          start: 'Tue May 11 2021 09:30:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 11:00:00 GMT+0700 (Indochina Time)',
          minute_of_day: 570,
          meeting_time: 90,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Báo cáo tiến độ khảo sát lần 1'
        },
        {
          start: 'Tue May 11 2021 13:40:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 14:30:00 GMT+0700 (Indochina Time)',
          minute_of_day: 820,
          meeting_time: 50,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Báo cáo tiến độ tổng quan dự án lần 1'
        }
      ]
    },
    {
      day_of_week: 2,
      schedule: [
        {
          start: 'Tue May 11 2021 09:15:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 10:00:00 GMT+0700 (Indochina Time)',
          minute_of_day: 555,
          meeting_time: 45,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Chốt giá, phương án tài chính'
        },
        {
          start: 'Tue May 11 2021 16:30:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 17:50:00 GMT+0700 (Indochina Time)',
          minute_of_day: 990,
          meeting_time: 80,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Thảo luận thiết kế ERD'
        }
      ]
    },
    {
      day_of_week: 3,
      schedule: [
        {
          start: 'Tue May 11 2021 09:50:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 11:10:00 GMT+0700 (Indochina Time)',
          minute_of_day: 590,
          meeting_time: 80,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Thiết kế CSDL'
        },
        {
          start: 'Tue May 11 2021 13:30:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 14:10:00 GMT+0700 (Indochina Time)',
          minute_of_day: 810,
          meeting_time: 40,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Phân tích, đánh giá tính phù hợp và khả thi của CSDL'
        },
        {
          start: 'Tue May 11 2021 15:00:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 15:30:00 GMT+0700 (Indochina Time)',
          minute_of_day: 900,
          meeting_time: 30,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Báo cáo tiến độ xậy dụng source front-end'
        }
      ]
    },
    {
      day_of_week: 4,
      schedule: [
        {
          start: 'Tue May 11 2021 08:30:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 09:20:00 GMT+0700 (Indochina Time)',
          minute_of_day: 510,
          meeting_time: 50,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Báo cáo tiến độ xậy dụng source back-end'
        },
        {
          start: 'Tue May 11 2021 09:30:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 11:00:00 GMT+0700 (Indochina Time)',
          minute_of_day: 570,
          meeting_time: 90,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Báo cáo tổng quan dự án lần 2'
        },
        {
          start: 'Tue May 11 2021 13:40:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 14:30:00 GMT+0700 (Indochina Time)',
          minute_of_day: 820,
          meeting_time: 50,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Khắc phục các lỗi trong giai đoạn 1'
        }
      ]
    },
    {
      day_of_week: 5,
      schedule: [
        {
          start: 'Tue May 11 2021 09:15:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 10:00:00 GMT+0700 (Indochina Time)',
          minute_of_day: 555,
          meeting_time: 45,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Chuẩn bị cho gia đoạn 2'
        },
        {
          start: 'Tue May 11 2021 16:30:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 17:50:00 GMT+0700 (Indochina Time)',
          minute_of_day: 990,
          meeting_time: 80,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Báo cáo hoàn thành giao diện'
        }
      ]
    },

    {
      day_of_week: 6,
      schedule: [
        {
          start: 'Tue May 11 2021 10:35:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 11:20:00 GMT+0700 (Indochina Time)',
          minute_of_day: 635,
          meeting_time: 45,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Báo cáo tổng quan dự án lần 3'
        },
        {
          start: 'Tue May 11 2021 15:40:00 GMT+0700 (Indochina Time)',
          end: 'Tue May 11 2021 17:30:00 GMT+0700 (Indochina Time)',
          minute_of_day: 940,
          meeting_time: 110,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          name: 'Tổng kết giai đoạn 2'
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.hourArr = this.hourArr.filter(
      (hour, index) => index >= this.rangeShow.start && index < this.rangeShow.end
    );
    for (const dataDay of this.listDataWeek) {
      dataDay.schedule = dataDay.schedule.map((data: any) => ({
        ...data,
        start_time: dayjs(data.start).format('HH:mm'),
        end_time: dayjs(data.end).format('HH:mm'),
        day: dayjs(data.start).format('dddd, D MMMM')
      }));
    }
  }

  changeMeetingDetail(detail) {
    this.meetingDetail = detail;
  }
}
