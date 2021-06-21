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
  currentEmail: string;
  passwordVisible1: boolean = false;
  passwordVisible2: boolean = false;
  isFirstLogin: boolean = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.authService.fetchAuthenticatedUser().pipe(catchError(err => {
      console.log(err);
      return EMPTY;
    })).subscribe(result => {
      this.changePasswordForm.value.email = this.authService.getCurrentUser().data.user.email; 
      this.isFirstLogin = this.authService.getCurrentUser().data.user.isFirstLogin;
    })
  }

  initForm() {
    this.changePasswordForm = this.formBuilder.group({
      email: [''],
      curentPassword: [''],
      password: ['']
    });
  }

  ChangePassword(): void {
    delete this.changePasswordForm.value.curentPassword;
    this.authService.changePassword(this.changePasswordForm.value).pipe(catchError(err => {
    console.log(err)
    return EMPTY;
    })).subscribe(result => {
      this.router.navigateByUrl('/login');
    })
  }

  ComparePassword(): boolean {
    return false;
  }
}
