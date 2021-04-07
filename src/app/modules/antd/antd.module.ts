import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntdComponent } from './antd.component';
import { SharedModule } from '@shared/shared.module';
import { AntdRoutingModule } from './antd.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AntdComponent],
  imports: [CommonModule, SharedModule, AntdRoutingModule]
})
export class AntdModule {}
