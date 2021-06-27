import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-meeting-confirm',
  templateUrl: './meeting-confirm.component.html',
  styleUrls: ['./meeting-confirm.component.scss']
})
export class MeetingConfirmComponent implements OnInit {
  @Input() isVisible: boolean;
  @Input() meeting: any;
  @Output() modalEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public handleCancel(): void {
    this.modalEvent.emit('true');
  }

  public deleteRoom(): void {

  }

}
