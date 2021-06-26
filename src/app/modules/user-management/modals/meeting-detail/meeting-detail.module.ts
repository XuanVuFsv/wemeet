import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingDetailComponent } from './meeting-detail.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';



@NgModule({
  declarations: [MeetingDetailComponent],
  imports: [
    CommonModule,
    NzModalModule,
    NzIconModule,
    NzButtonModule,
    NzTagModule
  ],
  exports: [
    MeetingDetailComponent
  ]
})
export class MeetingDetailModule { }
