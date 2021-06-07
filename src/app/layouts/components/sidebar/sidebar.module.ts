import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    NzToolTipModule,
    NzIconModule,
    NzButtonModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
