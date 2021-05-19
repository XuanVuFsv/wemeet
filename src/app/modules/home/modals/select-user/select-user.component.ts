import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Repository } from '@app/data/repositories/repository';
import { Table } from '@app/shared/utilities/ui/table';
import { UserRepository, IUser } from '../../user.repository';
import { EditMeetingService } from '../edit-meeting/edit-meeting.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent<IUser> extends Table implements OnInit, AfterViewInit {
  filterFormValue = {
    keyword: '',
    team: ''
  };
  repository(): Repository {
    return this.userRepository;
  }
  listTeam = [
    {
      value: 'team1',
      label: 'team phát triển'
    },
    {
      value: 'team2',
      label: 'team thiết kế'
    },
    {
      value: 'team3',
      label: 'team phân tích'
    },
    {
      value: 'team4',
      label: 'team sale'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private userRepository: UserRepository,
    public editMeetingService: EditMeetingService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.initForm();
    this.rows = [
      {
        name: 'Đức Duy - Zojoo',
        id: 1,
        avatar: '../../assets/images/avatar/avatar2.png',
        role: 'Giám đốc kinh doanh',
        selected: true
      },
      {
        name: 'Minh Anh',
        id: 2,
        avatar: '../../assets/images/avatar/avatar1.png',
        role: 'Develop',
        selected: false
      },
      {
        name: 'Hoàng Văn',
        id: 3,
        avatar: '../../assets/images/avatar/avatar3.png',
        role: 'Trưởng phòng kinh doanh',
        selected: false
      },
      {
        name: 'Kim Oanh',
        id: 4,
        avatar: '../../assets/images/avatar/avatar4.png',
        role: 'Nhân viên sale',
        selected: false
      },
      {
        name: 'Phương Duyên',
        id: 5,
        avatar: '../../assets/images/avatar/avatar5.png',
        role: 'Kế toán',
        selected: false
      },
      {
        name: 'Trúc Linh',
        id: 6,
        avatar: '../../assets/images/avatar/avatar6.png',
        role: 'Kế toán',
        selected: false
      },
      {
        name: 'Văn Tiến',
        id: 7,
        avatar: '../../assets/images/avatar/avatar7.png',
        role: 'Develop',
        selected: false
      },
      {
        name: 'Minh Vũ',
        id: 8,
        avatar: '../../assets/images/avatar/avatar8.png',
        role: 'Nhân viên sale',
        selected: false
      },
      {
        name: 'Diệu Hương',
        id: 9,
        avatar: '../../assets/images/avatar/avatar1.png',
        role: 'Nhân viên sale',
        selected: false
      },
      {
        name: 'Quốc Thịnh',
        id: 10,
        avatar: '../../assets/images/avatar/avatar4.png',
        role: 'Develop',
        selected: false
      }
    ];
    this.changeStatusSelect();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  private initForm(): void {
    this.filterForm = this.fb.group({
      keyword: '',
      team: ''
    });
  }

  keywordFilterChange() {}

  selectMember(dataMember: any) {
    this.editMeetingService.members.push(dataMember);
    this.changeStatusSelect();
  }
  unselectMember(id: string) {
    let index = this.editMeetingService.members.findIndex(member => member.id === id);
    if (index > -1) {
      this.editMeetingService.members.splice(index, 1);
      this.changeStatusSelect();
    }
  }

  changeStatusSelect() {
    for (const member of this.rows) {
      if (this.editMeetingService.members.findIndex(c => c.id === member.id) > -1) {
        member.selected = true;
      } else {
        member.selected = false;
      }
    }
  }
}
