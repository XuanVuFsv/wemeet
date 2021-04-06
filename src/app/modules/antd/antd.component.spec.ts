import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntdComponent } from './antd.component';

describe('AntdComponent', () => {
  let component: AntdComponent;
  let fixture: ComponentFixture<AntdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
