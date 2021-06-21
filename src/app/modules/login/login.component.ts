import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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
  passwordVisible: boolean = false;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  Login(): void {
    console.log(this.loginForm.value);
    // delete this.loginForm.value.stayLogin;
    this.authService.login(this.loginForm.value).pipe(catchError(err => {
      console.log(err)
      return EMPTY;
    })).subscribe(result => {
      console.log(result);
      if (result.body.data.user.isFirstLogin)
      {
        this.router.navigateByUrl('/change-password');
      }
      else
      {
        this.router.navigateByUrl('/');
      }
    })
  }

  StayLogin(): void{
    console.log(this.loginForm.controls.stayLogin.value);
  }

}
