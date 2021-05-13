import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  BellOutline,
  CalendarOutline,
  DownOutline,
  UserOutline,
  PieChartOutline,
  TeamOutline,
  PlusOutline
} from '@ant-design/icons-angular/icons';

const icons = [
  BellOutline,
  CalendarOutline,
  DownOutline,
  UserOutline,
  PieChartOutline,
  TeamOutline,
  PlusOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class IconsProviderModule {}
