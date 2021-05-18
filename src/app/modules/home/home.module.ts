import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '@app/shared/shared.module';
import { HomeRoutingModule } from './home.routing';
import { WeekLayoutComponent } from './components/week-layout/week-layout.component';
import { MeetingDetailComponent } from './components/meeting-detail/meeting-detail.component';
import { EditMeetingComponent } from './modals/edit-meeting/edit-meeting.component';

@NgModule({
  declarations: [HomeComponent, WeekLayoutComponent, MeetingDetailComponent, EditMeetingComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
