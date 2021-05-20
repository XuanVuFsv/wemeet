import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthLayoutComponent } from './month-layout.component';

describe('MonthLayoutComponent', () => {
  let component: MonthLayoutComponent;
  let fixture: ComponentFixture<MonthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
