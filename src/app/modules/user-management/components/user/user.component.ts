import { ApiService } from './../../../../data/api.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Repository } from '@app/data/repositories/repository';
import { Table } from '@app/shared/utilities/ui/table';
import { UserRepository, IUser } from './user.repository';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError } from 'rxjs/operators';
import { MessageService } from '@app/shared/services/message.service';
import { UserEditComponent } from './modals/user-edit/user-edit.component';
import { EMPTY } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent<IUser> extends Table implements OnInit, AfterViewInit {
  filterFormValue = {
    fullname: '',
    team: '',
    role: '',
    is_active: ''
  };
  repository(): Repository {
    return this.userRepository;
  }

  nzStatusList: any = {
    0: 'error',
    1: 'success'
  };

  nzStatusName: any = {
    0: 'khoá',
    1: 'hoạt động'
  };

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

  listRole = [
    {
      value: 'STAFF',
      label: 'Nhân viên'
    },
    {
      value: 'LEAD',
      label: 'Trưởng nhóm'
    },
    {
      value: 'ADMIN',
      label: 'Admin - Quản trị'
    }
  ];

  listStatus = [
    {
      value: true,
      label: 'Đang hoạt động'
    },
    {
      value: false,
      label: 'Khoá'
    }
  ];

  constructor(
    private userRepository: UserRepository,
    private fb: FormBuilder,
    private apiService: ApiService,
    private modalService: NzModalService,
    private messageService: MessageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  private initForm(): void {
    this.filterForm = this.fb.group({
      fullname: '',
      team: '',
      role: '',
      is_active: ''
    });
  }

  fullnameFilterChange() {
    this.filterFormValue.fullname = this.filterForm.value.fullname;
    this.filterChange(this.filterFormValue, true);
  }

  roleFilterChange(): void {
    this.filterFormValue.role = this.filterForm.value.role;
    this.filterChange(this.filterFormValue, true);
  }

  showModalEditSupplier(data: any = null, id: string = '') {
    const modalCreate: NzModalRef = this.modalService.create({
      nzTitle: data ? 'Chỉnh sửa người dùng' : 'Tạo mới người dùng',
      nzContent: UserEditComponent,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: '500px',
      nzBodyStyle: {
        maxHeight: '60vh',
        paddingTop: '14px',
        paddingBottom: '14px',
        overflow: 'auto'
      },
      nzClassName: 'modal-not-submit',
      nzStyle: { paddingBottom: '0' },
      nzCentered: true,
      nzComponentParams: {
        dataEdit: data
      },
      nzFooter: [
        {
          label: 'Đóng',
          type: 'default',
          disabled: instance => {
            return instance.isLoading;
          },
          onClick: () => modalCreate.destroy()
        },
        {
          label: data ? 'Lưu thay đổi' : 'Tạo',
          type: 'primary',
          disabled: instance => {
            return instance.isLoading;
          },
          loading: instance => {
            return instance.isLoading;
          },
          onClick: () => {
            if (modalCreate.componentInstance.formIsValid()) {
              let dataEdit = JSON.parse(
                JSON.stringify(modalCreate.componentInstance.registerForm.value)
              );

              this.submitUser(dataEdit, modalCreate, id);
            }
          }
        }
      ]
    });
  }

  editUser(id: any = null) {
    this.userRepository
      .find(id, this.defaultQueryParams)
      .pipe(
        untilDestroyed(this),
        catchError(err => {
          // this.messageService.showErrorMessage(err, 'supplier');
          return EMPTY;
        })
      )
      .subscribe((resp: any) => {
        this.showModalEditSupplier(resp, id);
      });
  }

  createUser() {
    this.showModalEditSupplier();
  }

  submitUser(httpBody: any, modalCreate: NzModalRef, idEdit: string) {
    let config = modalCreate.getConfig();
    config.nzClassName = 'modal-submit';
    modalCreate.updateConfig(config);
    modalCreate.componentInstance.isLoading = true;
    if (idEdit) {
      delete httpBody.email;
    } else {
      delete httpBody.is_active;
    }

    let fetchApi = idEdit
      ? this.userRepository.update(idEdit, httpBody)
      : this.userRepository.create(httpBody);
    fetchApi
      .pipe(
        untilDestroyed(this),
        catchError(err => {
          modalCreate.componentInstance.isLoading = false;
          let config = modalCreate.getConfig();
          config.nzClassName = 'modal-not-submit';
          modalCreate.updateConfig(config);
          // this.messageService.showErrorMessage(err, 'supplier');
          return EMPTY;
        })
      )
      .subscribe(resp => {
        this.messageService.onHttpSuccess(
          idEdit ? 'Chỉnh sửa thành công' : 'Tạo mới người dùng thành công'
        );
        this.filterChange(this.filterFormValue, idEdit ? false : true);
        this.modalService.closeAll();
      });
  }

  submitDelete(idDelete: string) {
    this.userRepository
      .delete(idDelete)
      .pipe(
        untilDestroyed(this),
        catchError(err => {
          // this.messageService.showErrorMessage(err, 'supplier');
          return EMPTY;
        })
      )
      .subscribe(resp => {
        this.filterChange(this.filterFormValue, false);
        this.messageService.onHttpSuccess('Xoá người dùng thành công');
      });
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
