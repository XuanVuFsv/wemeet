import { MeetingModule } from './components/meeting/meeting.module';
import { RoomModule } from './components/room/room.module';
import { UserModule } from './components/user/user.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserManagementRoutingModule } from './user-management.routing';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    NzTabsModule,
    NzIconModule,
    UserManagementRoutingModule,
    UserModule,
    RoomModule,
    MeetingModule
  ]
})
export class UserManagementModule { }
