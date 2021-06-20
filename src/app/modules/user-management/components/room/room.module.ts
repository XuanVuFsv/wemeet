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



@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    NzInputModule,
    NzGridModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzDropDownModule,
    NewMeetingRoomModule,
    NewBuildingModule
  ],
  exports: [
    RoomComponent
  ]
})
export class RoomModule { }
