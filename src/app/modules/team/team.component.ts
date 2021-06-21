import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EditMeetingComponent } from '../home/modals/edit-meeting/edit-meeting.component';
import { SelectUserComponent } from '../home/modals/select-user/select-user.component';
// import { MeetingDetailComponent } from '../home/components/meeting-detail/meeting-detail.component';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']})
export class TeamComponent implements OnInit {
  isVisibleMiddle = false;



  isAddUser: boolean = false;
  isAddTeam: boolean = true;
  showEditTeamModal: boolean = false;
  showAddTeamModal: boolean = false;
  showRequestRoomModal: boolean = false;

  colorList = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
  currentTeamGroup = 0;
  currentTeamGroupSelected = 0;
  currentTeamSelected = 0;
  
  role = 'admin';
  meetingPageSize = 20;
  userPageSize = 20;
  currentTotalMeeting = 0;

  meetingData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  members = [
    '../../assets/images/avatar/avatar1.png',
    '../../assets/images/avatar/avatar2.png',
    '../../assets/images/avatar/avatar3.png',
    '../../assets/images/avatar/avatar4.png',
    '../../assets/images/avatar/avatar5.png',
    '../../assets/images/avatar/avatar6.png',
    '../../assets/images/avatar/avatar7.png',
    '../../assets/images/avatar/avatar8.png',
    '../../assets/images/avatar/avatar9.png'
  ];
  users= [
    {
      id: '1',
      username: 'Nairobi',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[3]
    },
    {
      id: '2',
      username: 'money',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[0],
    },
    {
      id: '3',
      username: 'Rio',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[4],
    },
    {
      id: '4',
      username: 'Denver',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[5],
    },
    {
      id: '5',
      username: 'Professor',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[1],
    },
    {
      id: '6',
      username: 'Porto',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[6],
    },
    {
      id: '7',
      username: 'Berlin',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[7],
    },
    {
      id: '8',
      username: 'Palermo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[8],
    },
    {
      id: '9',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    },
    {
      id: '91',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    },
    {
      id: '97',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    },
    {
      id: '94',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    },
    {
      id: '93',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    },
    {
      id: '39',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    },
    {
      id: '29',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    },
    {
      id: '19',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    },
    {
      id: '90',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    },
    {
      id: '910',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    },
    {
      id: '940',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    },
    {
      id: '903',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    },
    {
      id: '920',
      username: 'Tokyo',
      email: 'abc@gmail.com',
      role: 'staff',
      avatar:  this.members[2],
    }
  ];
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
          avatar:  this.members[0],
          bg_color: this.RandomColor(),
          memCount: 15,
          totalMeeting: 10,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 0 ',
          open: false,
          selected: false,
          disabled: false,
          users: [
            {
              id: '1',
              username: 'Nairobi',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[3]
            },
            {
              id: '2',
              username: 'money',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[0],
            },
            {
              id: '3',
              username: 'Rio',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[4],
            },
            {
              id: '4',
              username: 'Denver',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[5],
            },
            {
              id: '5',
              username: 'Professor',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[1],
            }
          ]
        },
        {
          level: 2,
          title: 'Team Angular',
          icon: 'user',
          avatar:  this.members[1],
          bg_color: this.RandomColor(),
          memCount: 20,
          totalMeeting: 8,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 1',
          selected: true,
          disabled: false,
          users: [
            {
              id: '1',
              username: 'Nairobi',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[3]
            },
            {
              id: '3',
              username: 'Rio',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[4],
            },
            {
              id: '5',
              username: 'Professor',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[1],
            }
          ]
        },
        {
          level: 2,
          title: 'Team React',
          icon: 'user',
          avatar:  this.members[2],
          bg_color: this.RandomColor(),
          memCount: 10,
          totalMeeting: 15,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 2',
          selected: false,
          disabled: false,
          users: [
            {
              id: '1',
              username: 'Nairobi',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[3]
            },
            {
              id: '3',
              username: 'Rio',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[4],
            },
            {
              id: '5',
              username: 'Professor',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[1],
            }
          ]
        },
        {
          level: 2,
          title: 'Team Go',
          icon: 'user',
          avatar:  this.members[3],
          bg_color: this.RandomColor(),
          memCount: 14,
          totalMeeting: 10,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 3',
          selected: false,
          disabled: false,
          users: [
            {
              id: '1',
              username: 'Nairobi',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[3]
            },
            {
              id: '3',
              username: 'Rio',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[4],
            },
            {
              id: '5',
              username: 'Professor',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[1],
            }
          ]
        },
        {
          level: 2,
          title: 'Team Swift',
          icon: 'user',
          avatar:  this.members[4],
          bg_color: this.RandomColor(),
          memCount: 23,
          totalMeeting: 12,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 4',
          selected: false,
          disabled: false,
          users: [
            {
              id: '1',
              username: 'Nairobi',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[3]
            },
            {
              id: '3',
              username: 'Rio',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[4],
            },
            {
              id: '5',
              username: 'Professor',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[1],
            }
          ]
        },
        {
          level: 2,
          title: 'Team Swift',
          icon: 'user',
          avatar:  this.members[4],
          bg_color: this.RandomColor(),
          memCount: 23,
          totalMeeting: 12,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 4',
          selected: false,
          disabled: false,
          users: [
            {
              id: '1',
              username: 'Nairobi',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[3]
            }
          ]
        },
        {
          level: 2,
          title: 'Team VFX',
          icon: 'user',
          avatar:  this.members[1],
          bg_color: this.RandomColor(),
          memCount: 17,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 6',
          selected: false,
          disabled: false,
          users: [
            {
              id: '1',
              username: 'Nairobi',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[3]
            },
            {
              id: '3',
              username: 'Rio',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[4],
            },
            {
              id: '5',
              username: 'Professor',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[1],
            }
          ]
        },
        {
          level: 2,
          title: 'Team Android',
          icon: 'user',
          avatar:  this.members[3],
          bg_color: this.RandomColor(),
          memCount: 10,
          selected: false,
          disabled: false,
          users: [
            {
              id: '1',
              username: 'Nairobi',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[3]
            },
            {
              id: '3',
              username: 'Rio',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[4],
            },
            {
              id: '5',
              username: 'Professor',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[1],
            }
          ]
        },
        {
          level: 2,
          title: 'Team Android',
          icon: 'user',
          avatar:  this.members[5],
          bg_color: this.RandomColor(),
          memCount: 10,
          selected: false,
          disabled: false,
          users: [
            {
              id: '1',
              username: 'Nairobi',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[3]
            },
            {
              id: '3',
              username: 'Rio',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[4],
            },
            {
              id: '5',
              username: 'Professor',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[1],
            }
          ]
        },
        {
          level: 2,
          title: 'Team Android',
          icon: 'user',
          avatar:  this.members[0],
          bg_color: this.RandomColor(),
          memCount: 10,
          selected: false,
          disabled: false,
          users: [
            {
              id: '1',
              username: 'Nairobi',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[3]
            },
            {
              id: '3',
              username: 'Rio',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[4],
            },
            {
              id: '5',
              username: 'Professor',
              email: 'abc@gmail.com',
              role: 'staff',
              avatar:  this.members[1],
            }
          ]
        }
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
          avatar:  this.members[0],
          bg_color: this.RandomColor(),
          memCount: 32,
          totalMeeting: 4,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 1',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Team .Net',
          icon: 'team',
          avatar:  this.members[2],
          bg_color: this.RandomColor(),
          memCount: 25,
          totalMeeting: 7,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 2',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Team Unity',
          icon: 'team',
          avatar:  this.members[1],
          bg_color: this.RandomColor(),
          memCount: 25,
          totalMeeting: 11,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 3',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Team BA',
          icon: 'team',
          avatar:  this.members[4],
          totalMeeting: 24,
          describe: 'Wemeet: Quản lý cuộc họp của bạn 4',
          bg_color: this.RandomColor(),
          memCount: 15,
          selected: false,
          disabled: false
        }
      ]
    }
  ];

  meetingDetail : any;
  listOfSelectedValue: string[] = [];
  addTeamForm!: FormGroup;
  editTeamForm!: FormGroup;

  constructor(private nzMessageService: NzMessageService, private modalService: NzModalService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initAddTeamForm();
    this.initEdiTeamForm();
    this.role ='admin';
    this.currentTotalMeeting = this.menus[0].children[0].totalMeeting;
  }

  initAddTeamForm() {
    this.addTeamForm = this.formBuilder.group({
      teamName: [''],
      teamDescribe: ['']
    });
  }

  initEdiTeamForm() {
    this.editTeamForm = this.formBuilder.group({
      teamName: [''],
      teamDescribe: ['']
    });
  }

  // resetCustomTeamForm() {
  //   this.customTeamForm.value.teamName = '';
  //   this.customTeamForm.value.teamDescribe = '';
  // }

  // isNotSelected(value: string): boolean {
  //   return this.listOfSelectedValue.indexOf(value) === -1;
  // }

  show(): void {
    console.log(this.listOfSelectedValue);
  }

  isSelected(value: string): boolean {
    return this.listOfSelectedValue.indexOf(value) != -1 || this.menus[this.currentTeamGroupSelected].children[this.currentTeamSelected]['users'].map(x => x.id).indexOf(value) != -1;
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
    this.currentTotalMeeting = this.menus[tab].children[index].totalMeeting;
  }

  ChangeTeamGroup(tab): void {
    if (tab != 3)
    {
      this.currentTeamGroup = tab;
    }
    else this.currentTeamGroup = this.currentTeamGroup == 0 ? 1:0;
  }

  createMeeting() {
    let title = 'Tạo mới cuộc họp';
    this.showModalEditMeeting(title);
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

  showMeetingDetail() {
    let detail = {
      start: 'Tue May 11 2021 15:00:00 GMT+0700 (Indochina Time)',
      end: 'Tue May 11 2021 15:30:00 GMT+0700 (Indochina Time)',
      minute_of_day: 900,
      meeting_time: 30,
      name: 'Thảo luận phương án thiết kế và công nghệ sử dụng'
    };
    this.meetingDetail = detail;
  }

  SelectUsers(): void{
    this.isAddUser = !this.isAddUser;
  }

  AddUsers(): void{
    this.isAddUser = !this.isAddUser;
    let newUsers = this.users.filter(user => {
     return this.listOfSelectedValue.indexOf(user.id) != -1});
    this.menus[this.currentTeamGroupSelected].children[this.currentTeamSelected]['users'] = this.menus[this.currentTeamGroupSelected].children[this.currentTeamSelected]['users'].concat(newUsers);
    this.listOfSelectedValue.length = 0;
  }

  CustomTeam(): void {
    if (this.isAddTeam)
    {
      if (this.addTeamForm.value.teamName != '')
      {
        console.log(this.addTeamForm.value);
        this.showAddTeamModal = false;
      }
    }
    else
    {
      if (this.editTeamForm.value.teamDescribe == '')
      {
        this.editTeamForm.value.teamDescribe = this.menus[this.currentTeamGroupSelected].children[this.currentTeamSelected].describe;
      }
      if (this.editTeamForm.value.teamName == '')
      {
        this.editTeamForm.value.teamName = this.menus[this.currentTeamGroupSelected].children[this.currentTeamSelected].title;
      }
      console.log('edit');
      console.log(this.editTeamForm.value);
      console.log(this.showEditTeamModal);
    }
  }

  DisableTeam(): void {
    this.nzMessageService.success('Nhóm đã ngưng hoạt động');
  }

  ShowRequestRoomModal(): void {
    this.showRequestRoomModal = true;
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  handleOkRequestRoom(): void {
    this.showRequestRoomModal = false;
  }

  handleCancelRequestRoom(): void {
    this.showRequestRoomModal = false;
  }
}
