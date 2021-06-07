import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

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


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
      stayLogin: [false]
    });
  }

  Login(): void {
    console.log(this.loginForm.value);
  }

  StayLogin(): void{
    console.log(this.loginForm.controls.stayLogin.value);
  }

}
