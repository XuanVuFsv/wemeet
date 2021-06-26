import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Repository } from '@app/data/repositories/repository';
import { Table } from '@app/shared/utilities/ui/table';
import { UserRepository } from '../../home.repository';
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

  getTextName(fullName: string) {
    if (fullName) {
      let arrName = fullName.split(' ');
      let nameAvatar = arrName[1]
        ? arrName[0].charAt(0) + arrName[1].charAt(0)
        : arrName[0].charAt(0) + arrName[0].charAt(1);
      return this.nonAccentVietnamese(nameAvatar).toUpperCase();
    } else {
      return 'No';
    }
  }

  nonAccentVietnamese(str) {
    str = str.toLowerCase();
    //     We can also use this instead of from line 11 to line 17
    //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
    //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
    //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
    //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
    //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
    //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
    //     str = str.replace(/\u0111/g, "d");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    return str;
  }
}
