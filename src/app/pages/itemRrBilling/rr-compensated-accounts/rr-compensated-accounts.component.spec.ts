import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrCompensatedAccountsComponent } from './rr-compensated-accounts.component';

describe('RrCompensatedAccountsComponent', () => {
  let component: RrCompensatedAccountsComponent;
  let fixture: ComponentFixture<RrCompensatedAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrCompensatedAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrCompensatedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
