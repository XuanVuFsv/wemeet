import { FormBuilder, FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
  @Input() isVisible: boolean;
  @Output() modalEvent = new EventEmitter<string>();
  public newEmployeeForm: any;
  public loading = false;
  public avatarUrl?: any;
  constructor(
    private formBuilder: FormBuilder,
    private msg: NzMessageService
  ) {
    this.newEmployeeForm = this.formBuilder.group({
      username: new FormControl(null),
      email: new FormControl(null),
      nickname: new FormControl(null),
      position: new FormControl(null),
      role: new FormControl(null)
    })
  }

  ngOnInit(): void {
  }

  public beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  private getBase64(img: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = (event) => {
      this.avatarUrl = event.target.result;
    }
  }

  public onChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!)
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }


  public onRemove(): void {

  }

  public onClose(): void {
    this.modalEvent.emit('true');
  }

  public onCreate(): void {

  }


}
