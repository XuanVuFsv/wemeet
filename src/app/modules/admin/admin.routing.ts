import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutEnum } from '@core/enum/layout.enum';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    layout: LayoutEnum.MAIN,
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
