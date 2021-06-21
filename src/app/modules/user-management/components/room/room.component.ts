import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  public listOfData;
  public roomVisibility: boolean;
  public buildingVisibility: boolean;

  public room = [
    {
      id: 1,
      name: 'Quản trị viên',
    },
    {
      id: 1,
      name: 'Trưởng phòng',
    },
    {
      id: 1,
      name: 'Nhân viên',
    },
  ];

  public teams = [
    {
      id: 1,
      name: 'Rocket Task',
    },
    {
      id: 1,
      name: 'Rash Me',
    },
    {
      id: 1,
      name: 'Buble Boll',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public addMeetingRoom(): void {
    this.roomVisibility = true;
  }

  public addBuilding(): void {
    this.buildingVisibility = true;
  }

  public closeModal(e: Event): void {
    if (e) {
      this.roomVisibility = false;
      this.buildingVisibility = false;
    }
  }

}
