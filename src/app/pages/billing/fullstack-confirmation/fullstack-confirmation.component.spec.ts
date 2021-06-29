import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullstackConfirmationComponent } from './fullstack-confirmation.component';

describe('FullstackConfirmationComponent', () => {
  let component: FullstackConfirmationComponent;
  let fixture: ComponentFixture<FullstackConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullstackConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullstackConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
