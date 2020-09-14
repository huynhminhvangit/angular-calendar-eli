import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCalendarEliComponent } from './angular-calendar-eli.component';

describe('AngularCalendarEliComponent', () => {
  let component: AngularCalendarEliComponent;
  let fixture: ComponentFixture<AngularCalendarEliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularCalendarEliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularCalendarEliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
