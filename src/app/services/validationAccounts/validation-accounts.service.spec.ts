import { TestBed } from '@angular/core/testing';

import { ValidationAccountsService } from './validation-accounts.service';

describe('ValidationAccountsService', () => {
  let service: ValidationAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
