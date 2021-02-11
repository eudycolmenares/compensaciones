import { TestBed } from '@angular/core/testing';

import { MaintenanceOrdersSymptomsService } from './maintenance-orders-symptoms.service';

describe('MaintenanceOrdersSymptomsService', () => {
  let service: MaintenanceOrdersSymptomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceOrdersSymptomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
