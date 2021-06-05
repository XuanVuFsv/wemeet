import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logo = '../../assets/images/logo/logo.png';
  picture = '../../assets/images/picture.jpg';
  google = '../../assets/images/google.png';
  facebook = '../../assets/images/facebook.png';
  apple = '../../assets/images/apple.png';

  size: NzButtonSize = 'large';
  checked = false;


  constructor() { }

  ngOnInit(): void {

    function RememberPassword(){
      this.checked = !this.checked;
      console.log(this.checked);
    }
  }

}
