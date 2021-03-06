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
import { NzProgressModule } from 'ng-zorro-antd/progress';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { AccumulationChartModule, PieSeriesService, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService } from '@syncfusion/ej2-angular-charts';

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
    'Th??ng 1',
    'Th??ng 2',
    'Th??ng 3',
    'Th??ng 4',
    'Th??ng 5',
    'Th??ng 6',
    'Th??ng 7',
    'Th??ng 8',
    'Th??ng 9',
    'Th??ng 10',
    'Th??ng 11',
    'Th??ng 12'
  ],
  weekdays: ['Th??? hai', 'Th??? ba', 'Th??? t??', 'Th??? n??m', 'Th??? sau', 'Th??? b???y', 'Ch??? nh???t']
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
  NzProgressModule,
  NzInputNumberModule,
  NzSliderModule,
  NzSwitchModule,

  AccumulationChartModule,
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

vi_VN.DatePicker.lang['yearPlaceholder'] = 'n??m';
vi_VN.DatePicker.lang['monthPlaceholder'] = 'th??ng';
vi_VN.DatePicker.lang['weekPlaceholder'] = 'tu???n';
vi_VN.DatePicker.lang['rangeYearPlaceholder'] = 'kho???ng n??m';
vi_VN.DatePicker.lang['rangeMonthPlaceholder'] = 'kho???ng th??ng';
vi_VN.DatePicker.lang['rangeWeekPlaceholder'] = 'kho???ng tu???n';

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
    },
    PieSeriesService, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService
  ]
})
export class SharedModule {}
