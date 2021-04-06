import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutEnum } from '@core/enum/layout.enum';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    layout: LayoutEnum.MAIN,
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
