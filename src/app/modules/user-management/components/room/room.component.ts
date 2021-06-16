import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  public listOfData;
  public isVisible: boolean;

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
    this.isVisible = true;
  }

  public closeModal(e: Event): void {
    if (e) {
      this.isVisible = false;
    }
  }

}
