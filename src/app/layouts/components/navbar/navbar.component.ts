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

  constructor() {}

  ngOnInit(): void {}

  changeHourStart(hourStart: any) {}

  saveSetting() {
    console.log(this.weekHourShow);
    console.log(this.getNotifications);
    console.log(this.timeBeforeSendNoti);
  }
}
