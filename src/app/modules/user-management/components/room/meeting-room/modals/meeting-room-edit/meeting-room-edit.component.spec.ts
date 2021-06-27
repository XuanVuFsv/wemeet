import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRoomEditComponent } from './meeting-room-edit.component';

describe('MeetingRoomEditComponent', () => {
  let component: MeetingRoomEditComponent;
  let fixture: ComponentFixture<MeetingRoomEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingRoomEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingRoomEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
