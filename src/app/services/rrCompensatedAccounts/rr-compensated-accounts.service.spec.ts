import { TestBed } from '@angular/core/testing';

import { RrCompensatedAccountsService } from './rr-compensated-accounts.service';

describe('RrCompensatedAccountsService', () => {
  let service: RrCompensatedAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RrCompensatedAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
