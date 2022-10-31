import { TestBed } from '@angular/core/testing';

import { PhysicalAccountService } from './physical-account.service';

describe('PhysicalAccountService', () => {
  let service: PhysicalAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicalAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
