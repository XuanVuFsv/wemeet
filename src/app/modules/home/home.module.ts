import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '@app/shared/shared.module';
import { HomeRoutingModule } from './home.routing';
import { WeekLayoutComponent } from './components/week-layout/week-layout.component';

@NgModule({
  declarations: [HomeComponent, WeekLayoutComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
