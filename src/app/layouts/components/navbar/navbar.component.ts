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
  username: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.fetchAuthenticatedUser().pipe(catchError(err => {
      console.log(err);
      return EMPTY;
    })).subscribe(result => {
      this.username = this.authService.getCurrentUser().data.user.fullname;
      this.role = this.authService.getCurrentUser().data.roles;
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
}
