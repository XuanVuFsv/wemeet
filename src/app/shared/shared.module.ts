import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { IconsProviderModule } from './icons-provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '@env';

// ant design
import { vi_VN, NZ_I18N, NZ_DATE_CONFIG } from 'ng-zorro-antd/i18n';
import { HttpClientModule } from '@angular/common/http';
import { DataModule } from '@app/data/data.module';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MessageService } from './services/message.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import * as dayjs from 'dayjs';
import * as updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/vi';

// pipes
import { DateFormatPipe, FileSizePipe } from './pipes';
dayjs.extend(updateLocale);

dayjs.locale('vi');
dayjs.updateLocale('vi', {
  weekStart: 1,
  months: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'
  ],
  weekdays: ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sau', 'Thứ bảy', 'Chủ nhật']
});

registerLocaleData(vi);

// Contains all shared modules
const MODULES: any[] = [
  CommonModule,
  IconsProviderModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  NzSelectModule,
  NzToolTipModule,
  NzInputModule,
  NzFormModule,
  NzButtonModule,
  NzNotificationModule,
  NzPopoverModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzBadgeModule,
  NzTagModule,
  NzAvatarModule,
  NzModalModule,
  NzTableModule,
  NzPopconfirmModule,
  NzCheckboxModule,
  NzTabsModule,
  NzPaginationModule,
  NzMessageModule,
  NzInputNumberModule,
  NzSliderModule,
  NzSwitchModule,
  DataModule.forRoot({ url: environment.apiUrl })
];

// Contains all shared components
const COMPONENTS: any[] = [];

// Contains all shared pipes
const PIPES: any[] = [DateFormatPipe, FileSizePipe];

// Contains all shared directives
const DIRECTIVES: any[] = [];

// Contains all shared services
const SERVICES: any[] = [MessageService];

vi_VN.DatePicker.lang['yearPlaceholder'] = 'năm';
vi_VN.DatePicker.lang['monthPlaceholder'] = 'tháng';
vi_VN.DatePicker.lang['weekPlaceholder'] = 'tuần';
vi_VN.DatePicker.lang['rangeYearPlaceholder'] = 'khoảng năm';
vi_VN.DatePicker.lang['rangeMonthPlaceholder'] = 'khoảng tháng';
vi_VN.DatePicker.lang['rangeWeekPlaceholder'] = 'khoảng tuần';

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  providers: [
    ...SERVICES,
    { provide: NZ_I18N, useValue: vi_VN },
    {
      provide: NZ_DATE_CONFIG,
      useValue: {
        firstDayOfWeek: 1 // week starts on Monday (Sunday is 0)
      }
    }
  ]
})
export class SharedModule {}
