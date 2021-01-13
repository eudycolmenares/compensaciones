import { TestBed } from '@angular/core/testing';

import { MaintenanceOrdersCausesService } from './maintenance-orders-causes.service';

describe('MaintenanceOrdersCausesService', () => {
  let service: MaintenanceOrdersCausesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceOrdersCausesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
