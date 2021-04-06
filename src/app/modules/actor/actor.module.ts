import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorComponent } from './actor.component';
import { ActorRoutingModule } from './actor.routing';

@NgModule({
  declarations: [ActorComponent],
  imports: [CommonModule, ActorRoutingModule]
})
export class ActorModule {}
