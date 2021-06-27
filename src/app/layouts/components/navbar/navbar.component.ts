import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EMPTY } from 'rxjs';

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
  fullname: string = '';
  role: string = '';
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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.fetchAuthenticatedUser().pipe(catchError(err => {
      console.log(err);
      return EMPTY;
    })).subscribe(result => {
      this.fullname = this.authService.getCurrentUser().data.user.fullname;
      this.role = this.authService.getCurrentUser().data.user.role;
    })
  }
  changeHourStart(hourStart: any) {}

  saveSetting() {
    console.log(this.weekHourShow);
    console.log(this.getNotifications);
    console.log(this.timeBeforeSendNoti);
  }

  Logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  showNotificationList() {
    if (this.visibleNotification) {
      setTimeout(() => {
        this.visibleNotification = false;
      }, 0);
    }
  }
}
