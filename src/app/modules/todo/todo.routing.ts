import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutEnum } from '@core/enum/layout.enum';
import { TodoComponent } from './todo.component';

const routes: Routes = [
  {
    path: '',
    layout: LayoutEnum.MAIN,
    component: TodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {}
