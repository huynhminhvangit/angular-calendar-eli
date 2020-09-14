import { TestBed } from '@angular/core/testing';

import { AngularCalendarEliService } from './angular-calendar-eli.service';

describe('AngularCalendarEliService', () => {
  let service: AngularCalendarEliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularCalendarEliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
