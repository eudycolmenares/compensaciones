import { TestBed } from '@angular/core/testing';

import { AccountsRentsRRService } from './accounts-rents-rr.service';

describe('AccountsRentsRRService', () => {
  let service: AccountsRentsRRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsRentsRRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
