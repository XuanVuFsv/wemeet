import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as dayjs from 'dayjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IDayOfWeek } from './home.repository';
import { EditMeetingComponent } from './modals/edit-meeting/edit-meeting.component';
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
  selectRoomMeeting: string = '';
  checkOptionsFilter = [
    { label: 'của tôi', value: 'me' },
    { label: 'của team tôi', value: 'my_team' }
  ];
  selectTag: string = '';
  selectFilter: string = '';
  members = [
    '../../assets/images/avatar/avatar1.png',
    '../../assets/images/avatar/avatar2.png',
    '../../assets/images/avatar/avatar3.png',
    '../../assets/images/avatar/avatar4.png',
    '../../assets/images/avatar/avatar5.png',
    '../../assets/images/avatar/avatar6.png'
  ];
  listMeeting = [0, 1, 2, 3, 4, 5, 6];
  meetingDetail: any;

  constructor(private modalService: NzModalService) {}

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

  createMeeting() {
    let title = 'Tạo mới cuộc họp';
    this.showModalEditMeeting(title);
  }

  showModalEditMeeting(title: string) {
    this.modalService.create({
      nzTitle: title,
      nzContent: EditMeetingComponent,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: '500px',
      nzBodyStyle: { maxHeight: '80vh', paddingTop: '12px', overflow: 'auto' },
      nzStyle: { paddingBottom: '0' },
      nzCentered: true,
      nzComponentParams: {},
      nzFooter: null
    });
  }

  showMeetingDetail() {
    let detail = {
      start: 'Tue May 11 2021 15:00:00 GMT+0700 (Indochina Time)',
      end: 'Tue May 11 2021 15:30:00 GMT+0700 (Indochina Time)',
      minute_of_day: 900,
      meeting_time: 30,
      name: 'Thảo luận phương án thiết kế và công nghệ sử dụng'
    };
    this.meetingDetail = detail;
  }
}
