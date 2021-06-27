import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeetingRoomComponent } from './new-meeting-room.component';

describe('NewMeetingRoomComponent', () => {
  let component: NewMeetingRoomComponent;
  let fixture: ComponentFixture<NewMeetingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMeetingRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMeetingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
