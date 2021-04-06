import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from './film.component';
import { FilmRoutingModule } from './film.routing';

@NgModule({
  declarations: [FilmComponent],
  imports: [CommonModule, FilmRoutingModule]
})
export class FilmModule {}
