import { AuthService } from '@core/services/auth.service';
import { ITeam } from './team.repository';
import { IUser } from './team.repository';
import { catchError } from 'rxjs/operators';
import { TeamService } from './../../core/services/team.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EditMeetingComponent } from '../home/modals/edit-meeting/edit-meeting.component';
import { SelectUserComponent } from '../home/modals/select-user/select-user.component';
// import { MeetingDetailComponent } from '../home/components/meeting-detail/meeting-detail.component';
import * as dayjs from 'dayjs';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']})
export class TeamComponent implements OnInit {
  role: string = '';
  id: string = '';

  isAddUser: boolean = false;
  showEditTeamModal: boolean = false;
  showAddTeamModal: boolean = false;
  showRequestRoomModal: boolean = false;
  onSelectMember: boolean = false;

  colorList = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
  currentTeamGroup = 0;
  currentTeamGroupSelected = 0;
  currentTeamSelected = 0;
  curTeamId: string = '';
  curMemberId: string = '';
  
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

  teams: ITeam[] = new Array();
  users: IUser[][] = new Array();
  curTeamSelected: ITeam;
  usersTest: IUser[] = new Array(20);
  curLeaderId: string = '';

  meetingDetail : any;
  listOfSelectedValue: string[] = [];
  addTeamForm!: FormGroup;
  editTeamForm!: FormGroup;

  constructor(private nzMessageService: NzMessageService, private modalService: NzModalService, private formBuilder: FormBuilder,private authService: AuthService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.initAddTeamForm();
    this.initEdiTeamForm();

    this.UpdateTeams();
    this.UpdateListUser();
    this.role = this.authService.getCurrentUser().data.user.role;
    this.id = this.authService.getCurrentUser().data.user.id;
    for (let i = 0; i < 20; i++)
    {
      this.usersTest[i] = {
        id: i + '',
        email: 'me' + i + '@gmail.com',
        fullname: 'name ' + i,
        nickname: 'm' + i,
        position: 'dev',
        role: 'staff'
      }
    }
    // this.currentTotalMeeting = this.menus[0].children[0].totalMeeting;
  }

  initAddTeamForm() {
    this.addTeamForm = this.formBuilder.group({
      name: [''],
      description: [''],
      l_id: this.authService.getCurrentUser().data.user.id
    });
  }

  initEdiTeamForm() {
    this.editTeamForm = this.formBuilder.group({
      id: [''],
      name: [''],
      description: ['']
    });
  }

  show(): void {
    console.log(this.listOfSelectedValue);
  }

  isSelected(value: string): boolean {
    return this.listOfSelectedValue.indexOf(value) != -1 || this.curTeamSelected.users.map(user => user.id).indexOf(value) != -1;
  }
  
  GetDateByTeam(date: string): any {  
    return dayjs().format('DD/MM/YYYY HH[ giờ ]MM[ phút]');
  }

  RandomColor(): string {
    let valColor = (Math.floor(Math.random() * 9) + 1) * 100;
    let color = this.colorList[Math.floor(Math.random() * 7)];
    return 'bg-'+ color + '-' + valColor;
  }

  SelectMember(id: string, onSelectMember: boolean) {
    this.curMemberId = id;
    this.onSelectMember = onSelectMember;
  }

  LoadTeamInfor(id: string, isRequired: boolean): void {
    if (this.curTeamId == id && !isRequired) return;
    this.curTeamId = id;
    this.teamService.getTeam(id).pipe(catchError(err => {
      console.log(err)
      return EMPTY;
    })).subscribe(result => {
      this.curTeamSelected = result.body.data;
      this.curLeaderId = result.body.data.leader.id;
      this.curTeamSelected.users.unshift(result.body.data.leader);
      this.curTeamSelected.created_at = this.curTeamSelected.created_at.slice(0, 16);
    });
    // this.currentTotalMeeting = this.menus[tab].children[index].totalMeeting;
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

  UpdateListUser(): void
  {
    // this.teamService.getAllUser().pipe(catchError(err => {
    //   console.log(err)
    //   return EMPTY;
    // })).subscribe(result => {
    //   this.users[0] = result.body.data;
    //   let totalPage = result.body.pagination.total_page;
    //   let pageSize = result.body.pagination.per_page;

    //   if (totalPage > 1)
    //   {
    //     for (let i = 2; i <= totalPage; i++)
    //     {
    //       this.teamService.getAllUser(i, pageSize, '').pipe(catchError(err => {
    //         console.log(err)
    //         return EMPTY;
    //       })).subscribe(result => {
    //         this.users.push(result.body.data);
    //       });
    //       if (i == totalPage) console.log(this.users);
    //     }
    //   }
    // })
    this.teamService.getAllUser().pipe(catchError(err => {
      console.log(err)
      return EMPTY;
    })).subscribe(result => {
      this.users = result.body.data;
    })
  }

  SelectUsers(): void{
    this.isAddUser = !this.isAddUser;
    this.show();
    this.UpdateListUser();
  }
  
  UpdateTeams(): void
  {
    // this.teamService.getAllTeam(1, 2, null, null, 'create_at').pipe(catchError(err => {
    //   console.log(err)
    //   return EMPTY;
    // })).subscribe(result => {
    //   console.log(result);  
    //   this.teams = result.body.data;
    //   this.curTeamSelected = this.teams[0];
    //   this.LoadTeamInfor(this.teams[0].id);
    //   this.curTeamId = this.teams[0].id;
    //   for (let team of this.teams) team.created_at = team.created_at.slice(0, 16);

    //   let totalPage = result.body.pagination.total_page;
    //   let pageSize = result.body.pagination.per_page;

    //   if (totalPage > 1)
    //   {
    //     for (let i = 2; i <= totalPage; i++)
    //     {
    //       this.teamService.getAllTeam(i, pageSize, null, '').pipe(catchError(err => {
    //         console.log(err)
    //         return EMPTY;
    //       })).subscribe(result => {
    //         for (let team of result.body.data)
    //         {
    //           team.created_at = team.created_at.slice(0, 16);
    //           this.teams.push(team);
    //         }
    //       });
    //     }
    //   }
    // })
    this.teamService.getTeam('5').pipe(catchError(err => {
      console.log(err)
      return EMPTY;
    })).subscribe(result => {
      console.log(result);  
      this.teams[0] = result.body.data;
      this.curTeamSelected = this.teams[0];
      this.LoadTeamInfor(this.teams[0].id, true);
      this.curTeamId = this.teams[0].id;
      for (let team of this.teams) team.created_at = team.created_at.slice(0, 16);
    })
  }

  CreateTeam(): void {
    if (this.addTeamForm.value.name != '')
    {
      this.showAddTeamModal = false;
      this.teamService.createTeam(this.addTeamForm.value).pipe(catchError(err => {
        console.log(err)
        return EMPTY;
      })).subscribe(result => {
        this.UpdateTeams();
      })
    }
    else
    {
      console.log('type new team name');
    }
  }

  EditTeam(): void {
      if (this.editTeamForm.value.name == '' && this.editTeamForm.value.description == '') return;
      this.editTeamForm.value.id = this.curTeamId;
      if (this.editTeamForm.value.name == '')
      {
        this.editTeamForm.value.name = this.curTeamSelected.name;
      }
      if (this.editTeamForm.value.description == '')
      {
        this.editTeamForm.value.description = this.curTeamSelected.description;
      }
      this.teamService.editTeam(this.editTeamForm.value).pipe(catchError(err => {
        console.log(err)
        return EMPTY;
      })).subscribe(result => {
        console.log(result);
        this.UpdateTeams();
        this.LoadTeamInfor(this.curTeamId, true);
      })
      this.showEditTeamModal = false;
  }

  DisableTeam(): void {
    this.nzMessageService.success('Nhóm đã ngưng hoạt động');
  }

  AddUserToTeam(): void {
    this.isAddUser = !this.isAddUser;
    this.show();

    let newUsers: string[] = new Array();
    newUsers = this.curTeamSelected.users.filter((user, index) => index != 0).map(user => user.id);
    console.log(newUsers);

    for (let newId of this.listOfSelectedValue)
    {
      newUsers.push(newId);
    }
    console.log(newUsers);

    this.teamService.addUserToTeam({
      "team_id": this.curTeamId,
      "user_ids": newUsers
    }).pipe(catchError(err => {
      console.log(err)
      return EMPTY;
    })).subscribe(result => {
      console.log(result);
      // this.UpdateTeams();
      // this.LoadTeamInfor(this.curTeamId, true);
    })

    this.listOfSelectedValue.length = 0;
  }

  RemoveUserFromTeam(): void {
    
  }

  ShowRequestRoomModal(): void {
    this.showRequestRoomModal = true;
  }

  handleOkRequestRoom(): void {
    this.showRequestRoomModal = false;
  }

  handleCancelRequestRoom(): void {
    this.showRequestRoomModal = false;
  }
}
