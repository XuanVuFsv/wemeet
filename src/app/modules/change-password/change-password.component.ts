import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  logo = '../../assets/images/logo/logo.png';
  picture = '../../assets/images/picture.jpg';

  changePasswordForm!: FormGroup;
  passwordVisible1: boolean = false;
  passwordVisible2: boolean = false;
  canLogin: boolean = false;
  message: string = 'Lần đầu đăng nhập! Vui lòng đổi sang mật khẩu mới!';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.fetchAuthenticatedUser().pipe(catchError(err => {
      console.log(err);
      return EMPTY;
    })).subscribe(result => {
      if (!this.authService.getCurrentUser().data.user.isFirstLogin)
      {
        this.router.navigateByUrl('/');
      }
    })
    this.initForm();
  }

  initForm() {
    this.changePasswordForm = this.formBuilder.group({
      password: [''],
      confirmPassword: ['']
    });
  }

  ChangePassword(): void {
    delete this.changePasswordForm.value.confirmPassword;
    this.authService.changePassword(this.changePasswordForm.value).pipe(catchError(err => {
    console.log(err)
    return EMPTY;
    })).subscribe(result => {
      this.authService.removeCurrentUser();
      this.message = 'Đổi mật khẩu thành công!'
      this.canLogin = true;
    })
  }

  ComparePassword(): boolean {
    return this.changePasswordForm.value.password == this.changePasswordForm.value.confirmPassword && this.changePasswordForm.value.password != '';
  }
}
