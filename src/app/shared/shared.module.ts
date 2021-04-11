import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/ja';
import { IconsProviderModule } from './icons-provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '@env';

// ant design
import { vi_VN, NZ_I18N } from 'ng-zorro-antd/i18n';
import { HttpClientModule } from '@angular/common/http';
import { DataModule } from '@app/data/data.module';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MessageService } from './services/message.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

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
  DataModule.forRoot({ url: environment.apiUrl })
];

// Contains all shared components
const COMPONENTS: any[] = [];

// Contains all shared pipes
const PIPES: any[] = [];

// Contains all shared directives
const DIRECTIVES: any[] = [];

// Contains all shared services
const SERVICES: any[] = [MessageService];

registerLocaleData(vi);

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  providers: [...SERVICES, { provide: NZ_I18N, useValue: vi_VN }]
})
export class SharedModule {}
