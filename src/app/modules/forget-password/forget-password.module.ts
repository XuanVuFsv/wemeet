import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password.component';
import { SharedModule } from '@app/shared/shared.module';
import { ForgetPasswordRoutingModule } from './forget-password.routing';



@NgModule({
  declarations: [ForgetPasswordComponent],
  imports: [
    CommonModule, SharedModule, ForgetPasswordRoutingModule
  ]
})
export class ForgetPasswordModule { }
