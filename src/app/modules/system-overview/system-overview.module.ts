import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemOverviewComponent } from './system-overview.component';
import { SystemOverviewRoutingModule } from './system-overview.routing';

@NgModule({
  declarations: [SystemOverviewComponent],
  imports: [CommonModule, SystemOverviewRoutingModule]
})
export class SystemOverviewModule {}
