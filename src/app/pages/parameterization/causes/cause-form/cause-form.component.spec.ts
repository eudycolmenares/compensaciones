import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CauseFormComponent } from './cause-form.component';

describe('CauseFormComponent', () => {
  let component: CauseFormComponent;
  let fixture: ComponentFixture<CauseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CauseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CauseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
