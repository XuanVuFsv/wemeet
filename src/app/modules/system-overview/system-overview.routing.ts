import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutEnum } from '@core/enum/layout.enum';
import { SystemOverviewComponent } from './system-overview.component';

const routes: Routes = [
  {
    path: '',
    layout: LayoutEnum.MAIN,
    component: SystemOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemOverviewRoutingModule {}
