import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingConfirmComponent } from './meeting-confirm.component';

describe('MeetingConfirmComponent', () => {
  let component: MeetingConfirmComponent;
  let fixture: ComponentFixture<MeetingConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
