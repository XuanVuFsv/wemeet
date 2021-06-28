import { FormBuilder, FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-meeting-room',
  templateUrl: './new-meeting-room.component.html',
  styleUrls: ['./new-meeting-room.component.scss']
})
export class NewMeetingRoomComponent implements OnInit {
  @Input() isVisible: boolean;
  @Output() modalEvent = new EventEmitter<string>();
  public newRoomForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.newRoomForm = this.formBuilder.group({
      roomName: new FormControl(null),
      building: new FormControl(null),
      capacity: new FormControl(null)
    });
  }

  ngOnInit(): void {}

  public createRoom(): void {
    const req = {
      ...this.newRoomForm.value
    };
  }

  public handleCancel(): void {
    this.modalEvent.emit('true');
  }

  public deleteRoom(): void {}
}
