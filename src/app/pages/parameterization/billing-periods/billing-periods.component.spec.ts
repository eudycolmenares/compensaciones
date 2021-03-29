import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPeriodsComponent } from './billing-periods.component';

describe('BillingPeriodsComponent', () => {
  let component: BillingPeriodsComponent;
  let fixture: ComponentFixture<BillingPeriodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingPeriodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
