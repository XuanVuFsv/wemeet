import { TeamService } from './../../core/services/team.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logo = '../../assets/images/logo/logo.png';
  picture = '../../assets/images/picture.jpg';
  google = '../../assets/images/google.png';
  facebook = '../../assets/images/facebook.png';
  apple = '../../assets/images/apple.png';

  loginForm!: FormGroup;
  stayLogin: boolean = true;
  onInit: boolean = true;
  passwordVisible: boolean = false;
  isEmail: boolean = false;
  acountNotExist: boolean = false;
  checkPasswordMessage: string = '';
  loginSuccess: boolean = false;
  isUseDefaultPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private teamSerive: TeamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.authService.fetchAuthenticatedUser().pipe(catchError(err => {
      console.log(err);
      return EMPTY;
    })).subscribe(result => {
      console.log(result);
      if (this.authService.getCurrentUser().data.user.is_first_login)
      {
        this.isUseDefaultPassword = true;
      }
    })
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ValidateEmail() {
    this.onInit = false;
    this.isEmail = !(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        this.loginForm.value.email
      ) && this.loginForm.value.email.includes('.')
    );
    this.checkPasswordMessage = '';
    this.acountNotExist = false;
  }

  Login(): void {
    this.onInit = false;
    this.ValidateEmail();
    if (this.isEmail) {
      return;
    }
    this.teamSerive.getUserByEmail(this.loginForm.value.email).subscribe(result => {
      if (result.body == null) {
        this.acountNotExist = true;
        this.checkPasswordMessage = '';
        return;
      }
      this.teamSerive.getUserByEmail(this.loginForm.value.email).pipe(catchError(err => {
        return EMPTY;
      })).subscribe(result => {
        if (result.body.data == null) {
          this.acountNotExist = true;
          this.checkPasswordMessage = '';
          return;
        }
        else {  
          setTimeout(() => {
            if (!this.loginSuccess && !this.acountNotExist)
            {
              this.checkPasswordMessage = 'Mật khẩu không chính xác';
              this.acountNotExist = false;
            }
          }, 2000)
          this.authService.login(this.loginForm.value).pipe(catchError(err => {
            console.log(err);
            return EMPTY;
          })).subscribe(result => {
            result.body != null ? this.loginSuccess = true : this.loginSuccess = false;
            if (result.body.data.user.is_first_login) {
              this.router.navigateByUrl('/change-password');
            } else {
              this.checkPasswordMessage = '';
              this.router.navigateByUrl('/');
            }
            return;
          });
      }
    });
    // }
  })
}
}