import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'antd',
    loadChildren: () => import('@modules/antd/antd.module').then(m => m.AntdModule)
  },
  {
    path: 'login',
    loadChildren: () => import('@modules/login/login.module').then(m => m.LoginModule),
    data: { title: 'Đăng nhập' }
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('@modules/user-management/user-management.module').then(m => m.UserManagementModule),
    data: { title: 'Quản lý nhân viên' }
  },
  {
    path: 'report',
    loadChildren: () => import('@modules/report/report.module').then(m => m.ReportModule),
    data: { title: 'Báo cáo' }
  },
  {
    path: 'team',
    loadChildren: () => import('@modules/team/team.module').then(m => m.TeamModule),
    data: { title: 'Team' }
  },
  {
    path: '',
    loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule),
    data: { title: 'Trang chủ' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
