import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeComponent } from './attendee.component';

describe('AttendeeComponent', () => {
  let component: AttendeeComponent;
  let fixture: ComponentFixture<AttendeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendeeComponent]
    });
    fixture = TestBed.createComponent(AttendeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
