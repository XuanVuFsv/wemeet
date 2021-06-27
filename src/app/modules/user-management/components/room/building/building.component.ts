import { FormBuilder } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Repository } from '@app/data/repositories/repository';
import { Table } from '@app/shared/utilities/ui/table';
import { BuildingRepository } from './building.repository';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { MessageService } from '@app/shared/services/message.service';
import { listPageSize } from '@app/core/constants/config';
import { BuildingEditComponent } from './modals/building-edit/building-edit.component';
import { untilDestroyed } from '@ngneat/until-destroy';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent<IContractors> extends Table implements OnInit, AfterViewInit {
  repository(): Repository {
    return this.buildingRepository;
  }

  filterFormValue = {};
  listPageSize = listPageSize;

  constructor(
    private buildingRepository: BuildingRepository,
    private fb: FormBuilder,
    private modalService: NzModalService,
    private messageService: MessageService
  ) {
    super();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  showModalEditBuilding(data: any = null, id: string = '') {
    const modalCreate: NzModalRef = this.modalService.create({
      nzTitle: data ? 'Chỉnh sửa toà nhà / văn phòng' : 'Tạo mới toà nhà / văn phòng',
      nzContent: BuildingEditComponent,
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

              this.submitBuilding(dataEdit, modalCreate, id);
            }
          }
        }
      ]
    });
  }

  editBuilding(id: any = null) {
    this.buildingRepository
      .find(id, this.defaultQueryParams)
      .pipe(
        untilDestroyed(this),
        catchError(err => {
          this.messageService.showErrorMessage(err);
          return EMPTY;
        })
      )
      .subscribe(resp => {
        this.showModalEditBuilding(resp, id);
      });
  }

  createBuilding() {
    this.showModalEditBuilding();
  }

  submitBuilding(httpBody: any, modalCreate: NzModalRef, idEdit: string) {
    let config = modalCreate.getConfig();
    config.nzClassName = 'modal-submit';
    modalCreate.updateConfig(config);
    modalCreate.componentInstance.isLoading = true;

    let fetchApi = idEdit
      ? this.buildingRepository.update(idEdit, httpBody)
      : this.buildingRepository.create(httpBody);
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
          idEdit ? 'Chỉnh sửa thành công' : 'Tạo toà nhà / văn phòng thành công'
        );
        this.filterChange(this.filterFormValue, idEdit ? false : true);
        this.modalService.closeAll();
      });
  }

  submitDelete(idDelete: string) {
    this.buildingRepository
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
        this.messageService.onHttpSuccess('Xoá toà nhà / văn phòng thành công');
      });
  }
}
