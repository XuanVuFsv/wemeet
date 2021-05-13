import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekLayoutComponent } from './week-layout.component';

describe('WeekLayoutComponent', () => {
  let component: WeekLayoutComponent;
  let fixture: ComponentFixture<WeekLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
