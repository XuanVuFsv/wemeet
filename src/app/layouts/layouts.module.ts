import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';

// Antd
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { SidebarModule } from './components/sidebar/sidebar.module';

@NgModule({
  declarations: [AuthLayoutComponent, MainLayoutComponent, BlankLayoutComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzCollapseModule,
    SharedModule,
    CoreModule,
    NzBadgeModule,
    NzPopoverModule,
    NzGridModule,
    SidebarModule
  ],
  exports: [AuthLayoutComponent, MainLayoutComponent, BlankLayoutComponent, NavbarComponent]
})
export class LayoutsModule {}
