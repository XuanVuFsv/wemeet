import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  public listOfData;
  public isVisible = false;

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

  public openMeetingDialog(): void {
    this.isVisible = true;
  }

}
