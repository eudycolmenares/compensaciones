import { TestBed } from '@angular/core/testing';

import { NewCauseService } from './new-cause.service';

describe('NewCauseService', () => {
  let service: NewCauseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewCauseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
