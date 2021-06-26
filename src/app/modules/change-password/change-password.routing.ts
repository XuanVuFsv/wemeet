import { ChangePasswordComponent } from './change-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutEnum } from '@core/enum/layout.enum';

const routes: Routes = [
  {
    path: '',
    layout: LayoutEnum.AUTH,
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule {}
