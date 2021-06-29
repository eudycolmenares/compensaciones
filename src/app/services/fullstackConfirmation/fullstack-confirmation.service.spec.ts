import { TestBed } from '@angular/core/testing';

import { FullstackConfirmationService } from './fullstack-confirmation.service';

describe('FullstackConfirmationService', () => {
  let service: FullstackConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullstackConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
