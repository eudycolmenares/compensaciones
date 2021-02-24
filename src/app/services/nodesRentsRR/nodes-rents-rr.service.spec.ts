import { TestBed } from '@angular/core/testing';

import { NodesRentsRRService } from './nodes-rents-rr.service';

describe('NodesRentsRRService', () => {
  let service: NodesRentsRRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodesRentsRRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
