import { NewBuildingModule } from './../../modals/new-building/new-building.module';
import { NewMeetingRoomModule } from './../../modals/new-meeting-room/new-meeting-room.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BuildingComponent } from './building/building.component';
import { BuildingEditComponent } from './building/modals/building-edit/building-edit.component';
import { SharedModule } from '@app/shared/shared.module';
import { BuildingDetailComponent } from './building/modals/building-detail/building-detail.component';
import { MeetingRoomComponent } from './meeting-room/meeting-room.component';
import { MeetingRoomEditComponent } from './meeting-room/modals/meeting-room-edit/meeting-room-edit.component';

@NgModule({
  declarations: [RoomComponent, BuildingComponent, BuildingEditComponent, BuildingDetailComponent, MeetingRoomComponent, MeetingRoomEditComponent],
  imports: [CommonModule, SharedModule],
  exports: [RoomComponent]
})
export class RoomModule {}
