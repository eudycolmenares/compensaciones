import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrFailureValidationComponent } from './rr-failure-validation.component';

describe('RrFailureValidationComponent', () => {
  let component: RrFailureValidationComponent;
  let fixture: ComponentFixture<RrFailureValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrFailureValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrFailureValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
