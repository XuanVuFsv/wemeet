import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cancel-meeting',
  templateUrl: './cancel-meeting.component.html',
  styleUrls: ['./cancel-meeting.component.scss']
})
export class CancelMeetingComponent implements OnInit {
  @Input() isVisible: boolean;
  @Output() modalEvent = new EventEmitter<string>();
  public cancelMeetingForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.cancelMeetingForm = this.formBuilder.group({
      reason: new FormControl(null)
    });
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    const req = {
      ...this.cancelMeetingForm.value
    };
  }

  public onCancel(): void {
    this.modalEvent.emit('true');
  }

  public onDelete(): void {}
}
