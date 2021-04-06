import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeComponent } from './episode.component';
import { EpisodeRoutingModule } from './episode.routing';

@NgModule({
  declarations: [EpisodeComponent],
  imports: [CommonModule, EpisodeRoutingModule]
})
export class EpisodeModule {}
