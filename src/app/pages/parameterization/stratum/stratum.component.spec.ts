import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratumComponent } from './stratum.component';

describe('StratumComponent', () => {
  let component: StratumComponent;
  let fixture: ComponentFixture<StratumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StratumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StratumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
