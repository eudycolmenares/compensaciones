import { TestBed } from '@angular/core/testing';

import { FailureValidationService } from './failure-validation.service';

describe('FailureValidationService', () => {
  let service: FailureValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FailureValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
