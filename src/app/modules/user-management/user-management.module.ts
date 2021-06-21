import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserManagementRoutingModule } from './user-management.routing';

@NgModule({
  declarations: [UserManagementComponent],
  imports: [CommonModule, SharedModule, UserManagementRoutingModule]
})
export class UserManagementModule {}
