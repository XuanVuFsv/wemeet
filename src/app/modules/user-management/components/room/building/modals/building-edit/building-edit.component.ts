import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-building-edit',
  templateUrl: './building-edit.component.html',
  styleUrls: ['./building-edit.component.scss']
})
export class BuildingEditComponent implements OnInit {
  @Input() dataEdit: any;
  registerForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group(
      {
        name: [this.dataEdit?.name ?? '', [Validators.required]],
        address: [this.dataEdit?.address ?? '', [Validators.required]]
      },
      {
        updateOn: 'blur'
      }
    );
  }

  create() {
    this.formIsValid();
  }

  formIsValid(): boolean {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      for (const i in this.registerForm.controls) {
        if (this.registerForm.controls.hasOwnProperty(i)) {
          this.registerForm.controls[i].markAsDirty();
          this.registerForm.controls[i].updateValueAndValidity();
        }
      }
      return false;
    }
    return true;
  }
}
