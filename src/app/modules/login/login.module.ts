import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '@app/shared/shared.module';
import { LoginRoutingModule } from './login.routing';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, LoginRoutingModule, NzIconModule]
})
export class LoginModule {}
