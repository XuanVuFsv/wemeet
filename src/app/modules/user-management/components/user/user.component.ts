import { Component, OnInit } from '@angular/core';
interface Person {
  id: string;
  name: string;
  nickname: string;
  role: string;
  auth: string;
  team: string;
  date: string;
  status: Status;
}

enum Status {
  ACTIVE = 0,
  LOCKED = 1,
  DELETED = 2
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public role = [
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

  public status = [
    {
      id: 1,
      name: 'Hoạt động',
    },
    {
      id: 1,
      name: 'Khóa',
    },
    {
      id: 1,
      name: 'Đã xóa',
    },
  ];

  public listOfData: Person[] = [
    {
      id: '1',
      name: 'Trần Chí Thanh',
      nickname: 'Thanh méo',
      role: 'CEO',
      auth: 'Leader',
      team: 'Back-end 1',
      date: '12/02/2021 12:23',
      status: 0
    },
    {
      id: '1',
      name: 'Trần Chí Thanh',
      nickname: 'Thanh méo',
      role: 'CEO',
      auth: 'Leader',
      team: 'Back-end 1',
      date: '12/02/2021 12:23',
      status: 0
    },
    {
      id: '1',
      name: 'Trần Chí Thanh',
      nickname: 'Thanh méo',
      role: 'CEO',
      auth: 'Leader',
      team: 'Back-end 1',
      date: '12/02/2021 12:23',
      status: 0
    },
    {
      id: '1',
      name: 'Trần Chí Thanh',
      nickname: 'Thanh méo',
      role: 'CEO',
      auth: 'Leader',
      team: 'Back-end 1',
      date: '12/02/2021 12:23',
      status: 2
    },
    {
      id: '1',
      name: 'Trần Chí Thanh',
      nickname: 'Thanh méo',
      role: 'CEO',
      auth: 'Leader',
      team: 'Back-end 1',
      date: '12/02/2021 12:23',
      status: 1
    },
    {
      id: '1',
      name: 'Trần Chí Thanh',
      nickname: 'Thanh méo',
      role: 'CEO',
      auth: 'Leader',
      team: 'Back-end 1',
      date: '12/02/2021 12:23',
      status: 0
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
