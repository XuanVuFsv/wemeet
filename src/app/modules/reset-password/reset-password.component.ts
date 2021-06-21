import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  logo = '../../assets/images/logo/logo.png';
  picture = '../../assets/images/picture.jpg';

  resetPasswordForm!: FormGroup;
  passwordVisible1: boolean = false;
  passwordVisible2: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      password: [''],
      newPassword: ['']
    });
  }

  ResetPassword(): void {
    // console.log(this.resetPasswordForm.value);
    // // delete this.resetPasswordForm.value.stayLogin;
    // this.authService.resetPassword(this.resetPasswordForm.value).pipe(catchError(err => {
    //   console.log(err)
    //   return EMPTY;
    // })).subscribe(result => {
    //   console.log(result);
    //   // this.router.navigateByUrl('/');
    // })
  }
}
