import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingConfirmComponent } from './meeting-confirm.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';



@NgModule({
  declarations: [MeetingConfirmComponent],
  imports: [
    CommonModule,
    NzModalModule,
    NzIconModule,
    NzButtonModule,
  ],
  exports: [
    MeetingConfirmComponent
  ]
})
export class MeetingConfirmModule { }
