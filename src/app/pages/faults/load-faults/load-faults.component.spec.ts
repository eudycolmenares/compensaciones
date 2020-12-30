import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFaultsComponent } from './load-faults.component';

describe('LoadFaultsComponent', () => {
  let component: LoadFaultsComponent;
  let fixture: ComponentFixture<LoadFaultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadFaultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFaultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
