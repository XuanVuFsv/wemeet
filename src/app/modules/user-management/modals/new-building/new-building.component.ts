import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-building',
  templateUrl: './new-building.component.html',
  styleUrls: ['./new-building.component.scss']
})
export class NewBuildingComponent implements OnInit {

  @Input() isVisible: boolean;
  @Output() modalEvent = new EventEmitter<string>();
  public newBuildingForm: any;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.newBuildingForm = this.formBuilder.group({
      buildingName: new FormControl(null),
      address: new FormControl(null),
    });
  }

  ngOnInit(): void {
  }

  public onCreate(): void {
    const req = {
      ...this.newBuildingForm.value
    };
    console.log(req);
    
  }

  public onCancel(): void {
    this.modalEvent.emit('true');
  }

  public onDelete(): void {

  }
}
