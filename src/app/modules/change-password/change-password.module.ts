import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { SharedModule } from '@app/shared/shared.module';
import { ChangePasswordRoutingModule } from './change-password.routing';


@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule, SharedModule, ChangePasswordRoutingModule
  ]
})
export class ChangePasswordModule { }
