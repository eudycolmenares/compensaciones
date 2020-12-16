import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginTypeComponent } from './origin-type.component';

describe('OriginTypeComponent', () => {
  let component: OriginTypeComponent;
  let fixture: ComponentFixture<OriginTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
