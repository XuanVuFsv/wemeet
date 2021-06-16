import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UnauthenticatedInterceptor } from './interceptors/unauthenticated.interceptor';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    NgxPermissionsModule.forRoot({
      permissionsIsolate: true
    })
  ],
  exports: [LoadingComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthenticatedInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
