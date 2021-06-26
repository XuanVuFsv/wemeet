import { MeetingDetailComponent } from './meeting-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [MeetingDetailComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MeetingDetailComponent
  ]
})
export class MeetingDetailModule { }
