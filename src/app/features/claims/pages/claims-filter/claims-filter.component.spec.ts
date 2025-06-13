import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsFilterComponent } from './claims-filter.component';

describe('ClaimsFilterComponent', () => {
  let component: ClaimsFilterComponent;
  let fixture: ComponentFixture<ClaimsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimsFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
