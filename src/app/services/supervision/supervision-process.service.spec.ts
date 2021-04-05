import { TestBed } from '@angular/core/testing';

import { SupervisionProcessService } from './supervision-process.service';

describe('SupervisionProcessService', () => {
  let service: SupervisionProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupervisionProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
