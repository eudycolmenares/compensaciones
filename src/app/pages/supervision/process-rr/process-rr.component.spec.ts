import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessRRComponent } from './process-rr.component';

describe('ProcessRRComponent', () => {
  let component: ProcessRRComponent;
  let fixture: ComponentFixture<ProcessRRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessRRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessRRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
