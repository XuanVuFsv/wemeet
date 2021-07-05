import { PreviewReportComponent } from './preview-report.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutEnum } from '@core/enum/layout.enum';

const routes: Routes = [
  {
    path: '',
    layout: LayoutEnum.BLANK,
    component: PreviewReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviewReportRoutingModule {}
