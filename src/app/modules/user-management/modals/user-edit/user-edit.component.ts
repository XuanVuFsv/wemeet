import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input() dataEdit: any;
  registerForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.dataEdit);
  }

  initForm() {
    this.registerForm = this.formBuilder.group(
      {
        fullname: [this.dataEdit?.fullname ?? '', [Validators.required]],
        nickname: [this.dataEdit?.nickname ?? '', [Validators.required]],
        position: [this.dataEdit?.position ?? '', [Validators.required]]
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
