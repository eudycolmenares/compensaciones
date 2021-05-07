import { TestBed } from '@angular/core/testing';

import { NewSymptomService } from './new-symptom.service';

describe('NewSymptomService', () => {
  let service: NewSymptomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewSymptomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
