import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutEnum } from '@core/enum/layout.enum';
import { EditFilmComponent } from './page/edit-film/edit-film.component';

const routes: Routes = [
  {
    path: '',
    layout: LayoutEnum.MAIN,
    component: EditFilmComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditFilmRoutingModule {}
