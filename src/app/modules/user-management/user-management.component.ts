import { Component, OnInit } from '@angular/core';
import { NzTabPosition } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public nzTabPosition: NzTabPosition = 'left';
  public tabs = [1, 2, 3];
  constructor() { }

  ngOnInit(): void {
  }

}
