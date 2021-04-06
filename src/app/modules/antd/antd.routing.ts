import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutEnum } from '@core/enum/layout.enum';
import { AntdComponent } from './antd.component';

const routes: Routes = [
  {
    path: '',
    layout: LayoutEnum.MAIN,
    component: AntdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntdRoutingModule {}
