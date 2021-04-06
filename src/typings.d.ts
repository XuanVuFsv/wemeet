import { Route } from '@angular/router';
import { NgxPermissionsData } from 'ngx-permissions';
import { LayoutEnum } from '@core/enum/layout.enum';

declare module '@angular/router' {
  interface Route {
    layout?: LayoutEnum;
    permissions?: NgxPermissionsData;
  }
}
