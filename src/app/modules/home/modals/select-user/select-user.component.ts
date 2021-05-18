import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Repository } from '@app/data/repositories/repository';
import { Table } from '@app/shared/utilities/ui/table';
import { UserRepository, IUser } from '../../user.repository';

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

  constructor(private fb: FormBuilder, private userRepository: UserRepository) {
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
        role: 'Giám đốc kinh doanh'
      },
      {
        name: 'Minh Anh',
        id: 2,
        avatar: '../../assets/images/avatar/avatar1.png',
        role: 'Develop'
      },
      {
        name: 'Hoàng Văn',
        id: 3,
        avatar: '../../assets/images/avatar/avatar3.png',
        role: 'Trưởng phòng kinh doanh'
      },
      {
        name: 'Kim Oanh',
        id: 4,
        avatar: '../../assets/images/avatar/avatar4.png',
        role: 'Nhân viên sale'
      },
      {
        name: 'Phương Duyên',
        id: 5,
        avatar: '../../assets/images/avatar/avatar5.png',
        role: 'Kế toán'
      },
      {
        name: 'Trúc Linh',
        id: 6,
        avatar: '../../assets/images/avatar/avatar6.png',
        role: 'Kế toán'
      },
      {
        name: 'Văn Tiến',
        id: 7,
        avatar: '../../assets/images/avatar/avatar7.png',
        role: 'Develop'
      },
      {
        name: 'Minh Vũ',
        id: 8,
        avatar: '../../assets/images/avatar/avatar8.png',
        role: 'Nhân viên sale'
      },
      {
        name: 'Diệu Hương',
        id: 9,
        avatar: '../../assets/images/avatar/avatar1.png',
        role: 'Nhân viên sale'
      },
      {
        name: 'Quốc Thịnh',
        id: 10,
        avatar: '../../assets/images/avatar/avatar4.png',
        role: 'Develop'
      }
    ];
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
}
