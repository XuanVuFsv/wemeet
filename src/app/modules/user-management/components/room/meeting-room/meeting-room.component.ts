import { AfterViewInit, Component, OnInit } from '@angular/core';
import { listPageSize } from '@app/core/constants/config';
import { Repository } from '@app/data/repositories/repository';
import { MessageService } from '@app/shared/services/message.service';
import { Table } from '@app/shared/utilities/ui/table';
import { untilDestroyed } from '@ngneat/until-destroy';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RoomRepository, IRoom } from './meeting-room.repository';
import { MeetingRoomEditComponent } from './modals/meeting-room-edit/meeting-room-edit.component';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.scss']
})
export class MeetingRoomComponent<IRoom> extends Table implements OnInit, AfterViewInit {
  repository(): Repository {
    return this.roomRepository;
  }

  filterFormValue = {};
  listPageSize = listPageSize;

  nzStatusList: any = {
    1: 'success',
    0: 'error'
  };

  nzStatusName: any = {
    1: 'hoạt động',
    0: 'ngừng hoạt động'
  };

  constructor(
    private roomRepository: RoomRepository,
    private modalService: NzModalService,
    private messageService: MessageService
  ) {
    super();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  showModalEditRoom(data: any = null, id: string = '') {
    const modalCreate: NzModalRef = this.modalService.create({
      nzTitle: data ? 'Chỉnh sửa phòng họp' : 'Tạo mới phòng họp',
      nzContent: MeetingRoomEditComponent,
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

              this.submitRoom(dataEdit, modalCreate, id);
            }
          }
        }
      ]
    });
  }

  editRoom(id: any = null) {
    this.roomRepository
      .find(id, this.defaultQueryParams)
      .pipe(
        untilDestroyed(this),
        catchError(err => {
          this.messageService.showErrorMessage(err);
          return EMPTY;
        })
      )
      .subscribe(resp => {
        this.showModalEditRoom(resp, id);
      });
  }

  createRoom() {
    this.showModalEditRoom();
  }

  submitRoom(httpBody: any, modalCreate: NzModalRef, idEdit: string) {
    let config = modalCreate.getConfig();
    config.nzClassName = 'modal-submit';
    modalCreate.updateConfig(config);
    modalCreate.componentInstance.isLoading = true;

    let fetchApi = idEdit
      ? this.roomRepository.update(idEdit, httpBody)
      : this.roomRepository.create(httpBody);
    fetchApi
      .pipe(
        untilDestroyed(this),
        catchError(err => {
          modalCreate.componentInstance.isLoading = false;
          let config = modalCreate.getConfig();
          config.nzClassName = 'modal-not-submit';
          modalCreate.updateConfig(config);
          this.messageService.showErrorMessage(err);
          return EMPTY;
        })
      )
      .subscribe(resp => {
        this.messageService.onHttpSuccess(
          idEdit ? 'Chỉnh sửa thành công' : 'Tạo phòng họp thành công'
        );
        this.filterChange(this.filterFormValue, idEdit ? false : true);
        this.modalService.closeAll();
      });
  }

  submitDelete(idDelete: string) {
    this.roomRepository
      .delete(idDelete)
      .pipe(
        untilDestroyed(this),
        catchError(err => {
          this.messageService.showErrorMessage(err);
          return EMPTY;
        })
      )
      .subscribe(resp => {
        this.filterChange(this.filterFormValue, false);
        this.messageService.onHttpSuccess('Xoá phòng họp thành công');
      });
  }
}
