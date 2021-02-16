import { TestBed } from '@angular/core/testing';

import { RrFailureValidationService } from './rr-failure-validation.service';

describe('RrFailureValidationService', () => {
  let service: RrFailureValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RrFailureValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
