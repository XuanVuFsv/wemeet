import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { SharedModule } from '@app/shared/shared.module';
import { TeamRoutingModule } from './team.routing';
import { MeetingDetailModule } from '../home/components/meeting-detail/meeting-detail.module';
@NgModule({
  declarations: [TeamComponent],
  imports: [CommonModule, SharedModule, TeamRoutingModule, MeetingDetailModule]
})
export class TeamModule {}
