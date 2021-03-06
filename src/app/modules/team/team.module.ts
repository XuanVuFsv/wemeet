import { HomeModule } from './../home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { SharedModule } from '@app/shared/shared.module';
import { TeamRoutingModule } from './team.routing';
@NgModule({
  declarations: [TeamComponent],
  imports: [CommonModule, SharedModule, TeamRoutingModule, HomeModule]
})
export class TeamModule {}
