import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditFilmRoutingModule } from './edit-film.routing';
import { EditFilmComponent } from './page/edit-film/edit-film.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [EditFilmComponent],
  imports: [CommonModule, EditFilmRoutingModule, SharedModule]
})
export class EditFilmModule {}
