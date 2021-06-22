import { ResetPasswordModule } from './modules/reset-password/reset-password.module';
import { LoginGuard } from './core/guards/login.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'antd',
    loadChildren: () => import('@modules/antd/antd.module').then(m => m.AntdModule)
  },
  {
    path: 'todo',
    loadChildren: () => import('@modules/todo/todo.module').then(m => m.TodoModule)
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
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
    canActivate: [AuthGuard],
    loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule),
    data: { title: 'Trang chủ' }
  },
  {
    path: 'reset-password',
    canActivate: [LoginGuard],
    loadChildren: () => import('@modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    data: { title: 'Đặt lại mật khẩu' }
  },
  {
    path: 'forget-password',
    canActivate: [LoginGuard],
    loadChildren: () => import('@modules/forget-password/forget-password.module').then(m => m.ForgetPasswordModule),
    data: { title: 'Quên mật khẩu' }
  },
  {
    path: 'change-password',
    loadChildren: () => import('@modules/change-password/change-password.module').then(m => m.ChangePasswordModule),
    data: { title: 'Thay đổi mật khẩu' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
