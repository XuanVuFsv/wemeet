import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.scss']
})
export class MeetingDetailComponent implements OnInit {
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  @Input() isVisible: boolean;
  @Output() modalEvent = new EventEmitter<string>();

  tags = ['Tag 1', 'Tag 2', 'Tag 3'];
  inputVisible = false;
  inputValue = '';

  constructor() { }

  ngOnInit(): void {
  }

  public handleCancel(): void {
   this.modalEvent.emit('true');
  }

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

}
