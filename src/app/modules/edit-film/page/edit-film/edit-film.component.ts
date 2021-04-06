import { EpisodeComponent } from './../../../episode/episode.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '@app/data/api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EMPTY } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { environment } from '@env';
@UntilDestroy()
@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditFilmComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  episode;
  filmSelect;
  films: any[] = [];
  pathImage = environment.storageImage;

  ngOnInit(): void {
    this.getData();
  }

  getData(): any {
    this.films = [
      { value: 0, name: 'Chúa tể địa ngục', image: 'chua-te-dia-nguc.jpg' },
      { value: 11, name: 'Sisyphus', image: 'sispyhus.jpg' },
      { value: 12, name: 'Khởi nghiệp', image: 'khoi-nghiep.jpg' },
      { value: 13, name: 'Thế giới ma quái', image: 'the-gioi-ma-quai.jpg' },
      {
        value: 14,
        name: 'Nghệ thuật săn quỷ và nấu mì',
        image: 'nghe-thuat-san-quy-va-nau-mi.jpg'
      },
      { value: 15, name: 'Cảnh báo tình yêu', image: 'canh-bao-tinh-yeu.jpg' },
      { value: 16, name: 'Kẻ trộm mặt trăng', image: 'ke-trom-mat-trang.jpg' },
      { value: 17, name: 'Con tàu chiến thắng', image: 'con-tau-chien-thang.jpg' },
      { value: 18, name: 'Phụ lục tình yêu', image: 'phu-luc-tinh-yeu.jpg' },
      { value: 19, name: 'Hạ cánh nơi anh', image: 'ha-canh-noi-anh.jpg' },
      { value: 20, name: 'Fast and furious 7', image: 'fast-and-furious-7.jpg' }
    ];
  }
}
