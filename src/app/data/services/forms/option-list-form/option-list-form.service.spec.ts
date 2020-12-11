import { TestBed } from '@angular/core/testing';

import { OptionListFormService } from './option-list-form.service';

describe('OptionListFormService', () => {
  let service: OptionListFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionListFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
