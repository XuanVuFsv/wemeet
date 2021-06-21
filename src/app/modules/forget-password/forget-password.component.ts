import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  logo = '../../assets/images/logo/logo.png';
  picture = '../../assets/images/picture.jpg';
  getPasswordSuccess: boolean = true;

  forgetPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: [''],
      domain: ['localhost:4000']
    });
  }

  ForgetPassword(): void {
    console.log(this.forgetPasswordForm.value);
    this.authService.forgetPassword(this.forgetPasswordForm.value).pipe(catchError(err => {
      console.log(err);
      return EMPTY;
    })).subscribe(result => {
      console.log(result);
      result.body.status == '404' ? this.getPasswordSuccess = false : this.router.navigateByUrl('/login');
    })
  }

}
