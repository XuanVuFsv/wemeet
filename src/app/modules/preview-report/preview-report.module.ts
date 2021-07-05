import { UserModule } from './../user-management/components/user/user.module';
import { RoomModule } from './../user-management/components/room/room.module';
import { MeetingModule } from './../user-management/components/meeting/meeting.module';
import { ReportModule } from '../report/report.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewReportComponent } from './preview-report.component';
import { SharedModule } from '@app/shared/shared.module';
import { PreviewReportRoutingModule } from './preview-report.routing';


@NgModule({
  declarations: [PreviewReportComponent],
  imports: [
    CommonModule,
    SharedModule,
    PreviewReportRoutingModule,
    UserModule,
    RoomModule,
    MeetingModule,
    ReportModule
  ]
})
export class PreviewReportModule { }
