import { NzModalService } from 'ng-zorro-antd/modal';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EditMeetingComponent } from '../home/modals/edit-meeting/edit-meeting.component';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, AfterViewInit {

  colorList = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
  heightTeamTag = 'h-auto';
  currentTeamGroup = 0;
  currentTeamGroupSelected = 0;
  currentTeamSelected = 0;
  
  role = 'admin';


  menus = [
    {
      level: 1,
      title: 'Nhóm của tôi',
      icon: 'user',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'Team Mobile',
          icon: 'user',
          bg_color: this.RandomColor(),
          memCount: 15,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 0 ',
          open: false,
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Team Angular',
          icon: 'user',
          bg_color: this.RandomColor(),
          memCount: 20,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 1',
          selected: true,
          disabled: false
        },
        {
          level: 2,
          title: 'Team React',
          icon: 'user',
          bg_color: this.RandomColor(),
          memCount: 10,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 2',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Team Go',
          icon: 'user',
          bg_color: this.RandomColor(),
          memCount: 14,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 3',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Team Swift',
          icon: 'user',
          bg_color: this.RandomColor(),
          memCount: 23,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 4',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Team AI',
          icon: 'user',
          bg_color: this.RandomColor(),
          memCount: 24,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 5',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Team VFX',
          icon: 'user',
          bg_color: this.RandomColor(),
          memCount: 17,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 6',
          selected: false,
          disabled: false
        }
        // {
        //   level: 2,
        //   title: 'Team Android',
        //   icon: 'user',
        //   bg_color: this.RandomColor(),
        //   memCount: 10,
        //   selected: false,
        //   disabled: false
        // }
      ]
    },
    {
      level: 1,
      title: 'Nhóm tôi tham gia',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'Team Vue',
          icon: 'team',
          bg_color: this.RandomColor(),
          memCount: 32,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 1',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Team .Net',
          icon: 'team',
          bg_color: this.RandomColor(),
          memCount: 25,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 2',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Team Unity',
          icon: 'team',
          bg_color: this.RandomColor(),
          memCount: 25,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 3',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Team BA',
          icon: 'team',
          describe: 'Wemeet: Quản lý cuộc họp của bạn 4',
          bg_color: this.RandomColor(),
          memCount: 15,
          selected: false,
          disabled: false
        }
        // {
        //   level: 2,
        //   title: 'Team Tester',
        //   icon: 'team',
        //   bg_color: this.RandomColor(),
        //   memCount: 32,
        //   selected: false,
        //   disabled: false
        // },
        // {
        //   level: 2,
        //   title: 'Team Sound',
        //   icon: 'team',
        //   bg_color: this.RandomColor(),
        //   memCount: 25,
        //   selected: false,
        //   disabled: false
        // },
        // {
        //   level: 2,
        //   title: 'Team Effect',
        //   icon: 'team',
        //   bg_color: this.RandomColor(),
        //   memCount: 17,
        //   selected: false,
        //   disabled: false
        // },
        // {
        //   level: 2,
        //   title: 'Team UE4',
        //   icon: 'team',
        //   bg_color: this.RandomColor(),
        //   memCount: 20,
        //   selected: false,
        //   disabled: false
        // },
        // {
        //   level: 2,
        //   title: 'Team Designer',
        //   icon: 'team',
        //   bg_color: this.RandomColor(),
        //   memCount: 25,
        //   selected: false,
        //   disabled: false
        // }
      ]
    }
  ];

  constructor(private modalService: NzModalService, ) { }

  ngOnInit(): void {
    // this.role ='admin';
    console.log(this.menus);
  }

  ngAfterViewInit() {
    
  }
  
  GetCurrentDate(): any {
    
    return dayjs().format('DD/MM/YYYY HH[ giờ ]MM[ phút]');
  }

  RandomColor(): string {
    let valColor = (Math.floor(Math.random() * 9) + 1) * 100;
    let color = this.colorList[Math.floor(Math.random() * 7)];
    return 'bg-'+ color + '-' + valColor;
  }

  LoadTeamInfor(tab, index): void {
    this.currentTeamGroupSelected = tab;
    this.currentTeamSelected = index;
    console.log(tab + ' ' + index);
  }

  createMeeting() {
    let title = 'Tạo mới cuộc họp';
    this.showModalEditMeeting(title);
  }

  ChangeTeamGroup(): void {
    this.currentTeamGroup = this.currentTeamGroup == 0 ? 1:0;
  }

  showModalEditMeeting(title: string) {
    this.modalService.create({
      nzTitle: title,
      nzContent: EditMeetingComponent,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: '500px',
      nzBodyStyle: { maxHeight: '80vh', paddingTop: '12px', overflow: 'auto' },
      nzStyle: { paddingBottom: '0' },
      nzCentered: true,
      nzComponentParams: {},
      nzFooter: null
    });
    
  }
}
