import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { SharedModule } from '@app/shared/shared.module';
import { TodoRoutingModule } from './todo.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [TodoComponent],
  imports: [CommonModule, SharedModule, TodoRoutingModule, NzTableModule, NzPopconfirmModule]
})
export class TodoModule {}
