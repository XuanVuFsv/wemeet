import { NewEmployeeModule } from './../../modals/new-employee/new-employee.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, SharedModule, NewEmployeeModule],
  exports: [UserComponent]
})
export class UserModule {}
