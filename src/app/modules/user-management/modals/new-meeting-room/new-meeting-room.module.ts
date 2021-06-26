import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMeetingRoomComponent } from './new-meeting-room.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';



@NgModule({
  declarations: [NewMeetingRoomComponent],
  imports: [
    CommonModule,
    NzModalModule,
    NzIconModule,
    NzButtonModule,
    NzTagModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    NewMeetingRoomComponent
  ]
})
export class NewMeetingRoomModule { }
