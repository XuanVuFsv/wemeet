import { AuthService } from '@core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
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

  size: NzButtonSize = 'large';

  loginForm!: FormGroup;
  passwordVisible: boolean = false;


  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {

    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
      stayLogin: [false]
    });
  }

  Login(): void {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).pipe(catchError(err => {
      console.log(err)
      return EMPTY;
    })).subscribe(result => {
      console.log(result);
    })
  }

  StayLogin(): void{
    console.log(this.loginForm.controls.stayLogin.value);
  }

}
