import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  isCollapsed = false;
  theme = true;

  menus = [
    {
      level: 1,
      title: 'My Group',
      icon: 'user',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'Group 1',
          icon: 'bars',
          open: false,
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Group 2',
          icon: 'bars',
          selected: true,
          disabled: false
        },
        {
          level: 2,
          title: 'Group 3',
          icon: 'bars',
          selected: false,
          disabled: false
        }
      ]
    },
    {
      level: 1,
      title: 'Team Group',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'User 1',
          icon: 'user',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'User 2',
          icon: 'user',
          selected: false,
          disabled: false
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
