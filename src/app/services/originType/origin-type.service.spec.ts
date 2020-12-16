import { TestBed } from '@angular/core/testing';

import { OriginTypeService } from './origin-type.service';

describe('OriginTypeService', () => {
  let service: OriginTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OriginTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
