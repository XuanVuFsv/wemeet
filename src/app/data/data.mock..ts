import { InMemoryDbService } from 'angular-in-memory-web-api';

export class MockDatabaseService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { name: 0, value: 'Lừa đểu gặp lừa đảo' },
      { name: 11, value: 'Sisyphus' },
      { name: 12, value: 'Trở lại tuổi 18' },
      { name: 13, value: 'Thế giới ma quái' },
      { name: 14, value: 'Nghệ thuật săn quỷ và nấu mì' },
      { name: 15, value: 'Cảnh báo tình yêu' },
      { name: 16, value: 'Mị nguyệt truyện' },
      { name: 17, value: 'Chuyến tàu băng giá' },
      { name: 18, value: 'Phụ lục tình yêu' },
      { name: 19, value: 'Hạ cánh nơi anh' },
      { name: 20, value: 'Fast and furious 8' }
    ];

    const duy = [{ name: 'Duc Duy', age: 22 }];
    return { heroes, duy };
  }
}
