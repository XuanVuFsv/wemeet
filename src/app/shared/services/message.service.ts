import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class MessageService {
  listErrorText: any = {
    1464: 'Lỗi 1464',
    1231: 'Lỗi 1231',
    9821: 'Lỗi 9821'
  };

  constructor(private message: NzNotificationService) {}

  onHttpSuccess(message = 'Success'): void {
    this.message.create('success', 'Thành công', message);
  }

  onHttpFail(message = 'Error'): void {
    this.message.create('error', 'Thất bại', message);
  }

  showErrorMessage(err: any): void {
    switch (err.error.status) {
      case 422:
        const listError: number[] = err.error.error.code;
        let errorText = '';

        for (const error of listError) {
          errorText += `<div>${this.listErrorText[error]}</div>`;
        }
        this.onHttpFail(errorText);
        break;
      case 401:
        this.onHttpFail(`Tài khoản chưa đăng nhập, vui lòng đăng nhập để tiếp tục`);
        break;
      case 500:
        this.onHttpFail('Lỗi máy chủ, vui lòng thử lại sau một khoảng thời gian!');
        break;
      case 403:
        this.onHttpFail('Tài khoản của bạn không có quyền thực hiện hành động này!');
        break;
      default:
        this.onHttpFail('Lỗi không xác định, vui lòng thử lại!');
        break;
    }
  }
}
