import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  BellOutline,
  CalendarOutline,
  DownOutline,
  UserOutline,
  PieChartOutline,
  TeamOutline,
  PlusOutline,
  EnvironmentOutline,
  FileExcelOutline,
  FileWordOutline,
  FilePdfOutline,
  LoginOutline,
  LogoutOutline,
  DeleteOutline,
  EditOutline,
  SwapOutline
} from '@ant-design/icons-angular/icons';

const icons = [
  BellOutline,
  CalendarOutline,
  DownOutline,
  UserOutline,
  PieChartOutline,
  TeamOutline,
  PlusOutline,
  EnvironmentOutline,
  FileExcelOutline,
  FileWordOutline,
  FilePdfOutline,
  LoginOutline,
  LogoutOutline,
  DeleteOutline,
  EditOutline,
  SwapOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class IconsProviderModule {}
