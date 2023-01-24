import { TestBed } from '@angular/core/testing';

import { ReserveViewService } from './reserve-view.service';

describe('ReserveViewService', () => {
  let service: ReserveViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReserveViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
