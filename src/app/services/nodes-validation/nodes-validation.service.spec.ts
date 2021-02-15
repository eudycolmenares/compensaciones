import { TestBed } from '@angular/core/testing';

import { NodesValidationService } from './nodes-validation.service';

describe('NodesValidationService', () => {
  let service: NodesValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodesValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
