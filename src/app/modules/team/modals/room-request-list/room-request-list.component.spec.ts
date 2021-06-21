import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRequestListComponent } from './room-request-list.component';

describe('RoomRequestListComponent', () => {
  let component: RoomRequestListComponent;
  let fixture: ComponentFixture<RoomRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
