import { TeamService } from './../../core/services/team.service';
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

  forgetPasswordForm!: FormGroup;
  onInit: boolean = true;
  isSubmitForm: boolean = false;
  getPasswordSuccess: boolean = false;
  isEmail: boolean = false;
  acountNotExist: boolean = false;
  domain: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private teamService: TeamService, private router: Router) { }

  ngOnInit(): void {
    this.domain = window.location.origin.slice(7) + '/reset-password';
    console.log(this.domain);
    this.initForm();
  }

  initForm() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: [''],
      domain: ['']
    });
  }

  ValidateEmail() {
    this.onInit = false;
    this.isEmail = !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.forgetPasswordForm.value.email) && this.forgetPasswordForm.value.email.includes('.'));
    this.acountNotExist = false;
  };

  ForgetPassword(): void {
    this.isSubmitForm = true;
    this.onInit = false;
    this.ValidateEmail();
    if (this.isEmail)
    {
      return;
    }
      this.teamService.getUserByEmail(this.forgetPasswordForm.value.email).subscribe(result => {
        if (result.body == null) {
          this.acountNotExist = true;
          return;
        }
        else {
          if (result.body.data.is_first_login) this.router.navigateByUrl('/');
          this.isEmail = false;
          this.forgetPasswordForm.value.domain = this.domain;
          this.authService.forgetPassword(this.forgetPasswordForm.value).pipe(catchError(err => {
            console.log(err);
            return EMPTY;
          })).subscribe(result => {
            this.getPasswordSuccess = true;
          })
        }
      });
  }

}
