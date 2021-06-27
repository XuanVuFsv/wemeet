import { NewEmployeeModule } from './../../modals/new-employee/new-employee.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserEditComponent } from './modals/user-edit/user-edit.component';

@NgModule({
  declarations: [UserComponent, UserEditComponent],
  imports: [CommonModule, SharedModule, NewEmployeeModule],
  exports: [UserComponent]
})
export class UserModule {}
