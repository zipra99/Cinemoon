import { TestBed } from '@angular/core/testing';

import { TicketInfoService } from './ticket-info.service';

describe('TicketInfoService', () => {
  let service: TicketInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
