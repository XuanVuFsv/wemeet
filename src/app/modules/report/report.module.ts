import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReportRoutingModule } from './report.routing';

@NgModule({
  declarations: [ReportComponent],
  imports: [CommonModule, SharedModule, ReportRoutingModule],
  exports: [ReportComponent]
})
export class ReportModule {}
