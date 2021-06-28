import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '@app/shared/services/message.service';
import { TodoRepository, ITodo } from '@modules/todo/todo.repository';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EMPTY } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Person {
  _id: string;
  name: string;
  age: number;
  country: string;
}

@UntilDestroy()
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent<ITodo> implements OnInit {
  buttonBorderEdit = true;
  buttonBorderSave = true;
  buttonBorderCancel = true;
  // buttonBorder = true;
  listOfData: Person[] = [
    {
      _id: '1',
      name: 'John Brown',
      age: 32,
      country: 'New York No. 1 Lake Park'
    },
    {
      _id: '2',
      name: 'Jim Green',
      age: 42,
      country: 'London No. 1 Lake Park'
    },
    {
      _id: '3',
      name: 'Joe Black',
      age: 32,
      country: 'Sidney No. 1 Lake Park'
    }
  ];
  editCache: { [key: string]: { edit: boolean; data: Person } } = {};
  registerForm!: FormGroup;
  isLoadingAdd = false;

  constructor(
    private formBuilder: FormBuilder,
    private todoRepository: TodoRepository,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.updateEditCache();
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.minLength(1), Validators.required]],
      age: ['', [Validators.minLength(1), Validators.required]],
      country: ['', [Validators.minLength(1), Validators.required]]
    });
  }

  submitAdd(): any {
    this.isLoadingAdd = true;
    return this.todoRepository
      .create({
        name: this.registerForm.value.name,
        age: this.registerForm.value.age,
        country: this.registerForm.value.country
      })
      .pipe(
        untilDestroyed(this),
        debounceTime(500),
        distinctUntilChanged(),
        catchError(err => {
          this.isLoadingAdd = false;
          this.messageService.showErrorMessage(err);
          return EMPTY;
        })
      )
      .subscribe(resp => {
        this.isLoadingAdd = false;
        this.messageService.onHttpSuccess('Thêm mới thành công.');
      });
  }

  // getData(): any {
  //   return this.todoRepository
  //     .all()
  //     .pipe(
  //       untilDestroyed(this),
  //       debounceTime(500),
  //       distinctUntilChanged(),
  //       catchError(err => {
  //         this.isLoadingAdd = false;
  //         this.messageService.showErrorMessage(err);
  //         return EMPTY;
  //       })
  //     )
  //     .subscribe(resp => {
  //       this.listOfData = resp
  //       this.isLoadingAdd = false;
  //       this.messageService.onHttpSuccess('Thêm mới thành công.');
  //     });
  // }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item._id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item._id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d._id !== id);
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item._id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
}
