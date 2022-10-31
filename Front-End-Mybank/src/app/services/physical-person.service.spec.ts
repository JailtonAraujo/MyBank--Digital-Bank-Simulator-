import { TestBed } from '@angular/core/testing';

import { PhysicalPersonService } from './physical-person.service';

describe('PhysicalPersonService', () => {
  let service: PhysicalPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicalPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
