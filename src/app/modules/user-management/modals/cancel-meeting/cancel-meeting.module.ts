import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelMeetingComponent } from './cancel-meeting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';



@NgModule({
  declarations: [CancelMeetingComponent],
  imports: [
    CommonModule,
    NzModalModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule
  ],
  exports: [
    CancelMeetingComponent
  ]
})
export class CancelMeetingModule { }
