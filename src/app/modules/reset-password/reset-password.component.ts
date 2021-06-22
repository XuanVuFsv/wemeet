import { ActivatedRoute, Params, Router } from '@angular/router';
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
  canLogin: boolean = false;
  token: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initForm();
    this.token = this.router.url.slice(22)
  }

  initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      password: [''],
      confirmPassword: ['']
    });
    
  }

  ResetPassword(): void {
    delete this.resetPasswordForm.value.confirmPassword;
    console.log(this.resetPasswordForm.value);
    console.log(this.token);
    this.authService.resetPassword(this.resetPasswordForm.value, this.token).pipe(catchError(err => {
    console.log(err)
    return EMPTY;
    })).subscribe(result => {
      console.log(result);
      this.canLogin = true;
    })
  }

  ComparePassword(): boolean {
    return this.resetPasswordForm.value.password == this.resetPasswordForm.value.confirmPassword && this.resetPasswordForm.value.password != '';
  }
}
