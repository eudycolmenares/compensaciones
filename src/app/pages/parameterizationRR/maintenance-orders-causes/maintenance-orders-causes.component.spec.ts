import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceOrdersCausesComponent } from './maintenance-orders-causes.component';

describe('MaintenanceOrdersCausesComponent', () => {
  let component: MaintenanceOrdersCausesComponent;
  let fixture: ComponentFixture<MaintenanceOrdersCausesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceOrdersCausesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceOrdersCausesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
