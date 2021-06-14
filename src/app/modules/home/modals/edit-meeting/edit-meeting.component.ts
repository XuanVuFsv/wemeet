import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileType, FileTypeColor } from '@app/core/constants/file-type';
import { IFile } from '../../home.repository';
import { EditMeetingService } from './edit-meeting.service';

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
  listMember = [
    {
      name: 'Đức Duy - Zojoo',
      avatar: '../../assets/images/avatar/avatar2.png'
    }
  ];
  dragover: boolean = false;
  attachments: File[] = [];
  attachmentsView: IFile[] = [];

  constructor(private formBuilder: FormBuilder, public editMeetingService: EditMeetingService) {}

  ngOnInit(): void {
    this.initForm();
    this.editMeetingService.members = [
      {
        name: 'Đức Duy - Zojoo',
        id: 1,
        avatar: '../../assets/images/avatar/avatar2.png',
        role: 'Giám đốc kinh doanh',
        selected: true
      }
    ];
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
      tag: [null, [Validators.required]],
      team: [null, [Validators.required]]
    });
  }

  selectFile() {
    this.eleInputFile.nativeElement.click();
  }

  loadFile(files: FileList) {
    let re = /(?:\.([^.]+))?$/;
    Array.from(files).forEach(file => {
      this.attachments.push(file);
      let typeFile = FileType[re.exec(file.name)[1]] ?? 'unknown';
      this.attachmentsView.push({
        name: file.name,
        extension: re.exec(file.name)[1],
        size: file.size,
        type: 'file-' + typeFile,
        color: FileTypeColor[typeFile]
      });
    });
  }

  deleteFileSelect(index: number) {
    this.attachments.splice(index, 1);
    this.attachmentsView.splice(index, 1);
  }

  unselectMember(id: string) {
    let index = this.editMeetingService.members.findIndex(member => member.id === id);
    if (index > -1) {
      this.editMeetingService.members.splice(index, 1);
    }
  }
}
