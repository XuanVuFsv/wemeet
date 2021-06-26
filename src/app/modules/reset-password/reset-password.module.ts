import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from '@app/shared/shared.module';
import { ResetPasswordRoutingModule } from './reset-password.routing';


@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule, SharedModule, ResetPasswordRoutingModule
  ]
})
export class ResetPasswordModule { }
