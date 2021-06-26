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
  strengthPassword = {
    value: 0,
    text: '',
    color: ''
  };
  showLengthPasswordMessage: boolean = false;

  leastLowerCase = new RegExp('(?=.*[a-z])');
  leastUpperCase = new RegExp('(?=.*[A-Z])');
  leastDigit = new RegExp('(?=.*[0-9])');
  leastSpecialCharacter = new RegExp('(?=.*[^A-Za-z0-9])');

  // least
  // rule1: uppercase
  // rule: lowercase
  // rule3: number
  // rule4: special character
  strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})'); //length >= 10 and rule1234
  mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{10,}))|((?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,}))|((?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,}))');
  //length >= 8 and n1234
  //or length >= 10 and password don't include at least a rule from rule1 to rule4

  message: string = 'Lần đầu đăng nhập! Vui lòng đổi sang mật khẩu mới!';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.fetchAuthenticatedUser().pipe(catchError(err => {
      console.log(err);
      return EMPTY;
    })).subscribe(result => {
      if (!this.authService.getCurrentUser().data.user.is_first_login)
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

  CheckPasswordStrength() {
    if (this.changePasswordForm.value.password.length < 8 || this.changePasswordForm.value.password.length > 32) this.showLengthPasswordMessage = true;
    else this.showLengthPasswordMessage = false;

    if (this.strongPassword.test(this.changePasswordForm.value.password))
    {
      this.strengthPassword.color = 'green';
      this.strengthPassword.value = 100;
      this.strengthPassword.text = 'Mạnh';
    }
    else if (this.mediumPassword.test(this.changePasswordForm.value.password))
    {
      this.strengthPassword.color = 'yellow';
      this.strengthPassword.value = 67;
      this.strengthPassword.text = 'Vừa';
    }
    else
    {
      this.strengthPassword.color = 'red';
      this.strengthPassword.value = 33;
      this.strengthPassword.text = 'Yếu';
    }
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
