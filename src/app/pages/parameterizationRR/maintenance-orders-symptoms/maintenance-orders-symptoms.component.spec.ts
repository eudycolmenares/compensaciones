import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceOrdersSymptomsComponent } from './maintenance-orders-symptoms.component';

describe('MaintenanceOrdersSymptomsComponent', () => {
  let component: MaintenanceOrdersSymptomsComponent;
  let fixture: ComponentFixture<MaintenanceOrdersSymptomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceOrdersSymptomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceOrdersSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
