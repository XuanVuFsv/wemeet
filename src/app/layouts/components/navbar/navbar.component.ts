import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logo = '../../assets/images/logo/logo.png';
  avatar = '../../assets/images/avatar.png';

  constructor() {}

  ngOnInit(): void {}
}
