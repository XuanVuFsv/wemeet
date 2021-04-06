import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutEnum } from '@core/enum/layout.enum';
import { ActorComponent } from './actor.component';

const routes: Routes = [
  {
    path: '',
    layout: LayoutEnum.MAIN,
    component: ActorComponent
  },
  {
    path: ':id',
    layout: LayoutEnum.MAIN,
    component: ActorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorRoutingModule {}
