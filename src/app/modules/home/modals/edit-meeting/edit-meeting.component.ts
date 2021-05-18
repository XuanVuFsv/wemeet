import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditMeetingComponent implements OnInit, AfterViewInit {
  @ViewChild('eleDropArea', { read: ElementRef }) eleDropArea!: ElementRef;
  @ViewChild('eleInputFile', { read: ElementRef }) eleInputFile!: ElementRef;
  registerForm!: FormGroup;
  listTag = [
    {
      value: 'important',
      label: 'quan trọng'
    },
    {
      value: 'obligatory',
      label: 'bắt buộc'
    },
    {
      value: 'emergency',
      label: 'khẩn'
    },
    {
      value: 'normal',
      label: 'thông thường'
    }
  ];
  dragover: boolean = false;
  attachments: File[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit() {
    this.eleDropArea.nativeElement.addEventListener('dragover', event => {
      event.preventDefault(); //preventing from default behaviour
      this.dragover = true;
    });

    this.eleDropArea.nativeElement.addEventListener('dragleave', event => {
      this.dragover = false;
    });

    this.eleDropArea.nativeElement.addEventListener('drop', event => {
      event.preventDefault();
      let file = event.dataTransfer.files;
      this.loadFile(file);
    });
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      describe: ['', [Validators.required]],
      locale: ['', [Validators.required]],
      date: [null, [Validators.required]],
      time_start: [null, [Validators.required]],
      time_end: [null, [Validators.required]],
      tag: [null, [Validators.required]]
      // remarks: [this.data?.remarks],
      // data_type: [this.data?.data_type, [Validators.required]],
      // type: [+this.data?.type + '', [Validators.required]],
      // protocol: [this.data?.protocol, [Validators.required]],
      // host: [this.data?.receiver_protocol?.host],
      // port: [this.data?.receiver_protocol?.port, [Validators.pattern(/^[0-9]+$/)]],
      // folder: [this.data?.receiver_protocol?.folder],
      // account: [this.data?.receiver_protocol?.account],
      // user_id: [this.data?.receiver_protocol?.user_id],
      // password: [this.data?.receiver_protocol?.password],
      // key_file: [this.data?.receiver_protocol?.key_file],
      // time_setting_type: [+this.data?.time_setting_type + ''],
      // is_activated: [+this.data?.is_activated + '']
    });
  }

  selectFile() {
    this.eleInputFile.nativeElement.click();
  }

  loadFile(files: FileList) {
    console.log(files.item(0));
    Array.from(files).forEach(file => {
      this.attachments.push(file);
    });
    console.log(this.attachments);
  }
}
