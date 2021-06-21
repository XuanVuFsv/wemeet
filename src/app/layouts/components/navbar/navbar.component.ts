import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logo = '../../assets/images/logo/logo.png';
  avatar = '../../assets/images/avatar.png';
  hourTipFormatter = (value: number) => `${value} giờ`;
  parserHour = (value: string) => value.replace(' phút', '');
  formatterHour = (value: number) => `${value} phút`;
  weekHourShow: number[] = [0, 24];
  getNotifications: boolean = true;
  timeBeforeSendNoti: number = 30;
  username: string = '';
  visibleNotification = false;
  listNoti = [
    {
      time: '5 phút',
      seen: false
    },
    {
      time: '34 phút',
      seen: false
    },
    {
      time: '1 giờ',
      seen: true
    },
    {
      time: '8 giờ',
      seen: true
    },
    {
      time: '1 ngày',
      seen: false
    },
    {
      time: '2 ngày',
      seen: true
    },
    {
      time: '3 tuần',
      seen: false
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getCurrentUser().user.email;
  }
  changeHourStart(hourStart: any) {}

  saveSetting() {
    console.log(this.weekHourShow);
    console.log(this.getNotifications);
    console.log(this.timeBeforeSendNoti);
  }

  showNotificationList() {
    if (this.visibleNotification) {
      setTimeout(() => {
        this.visibleNotification = false;
      }, 0);
    }
  }
}
