import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallerDetailsComponent } from './caller-details.component';

describe('CallerDetailsComponent', () => {
  let component: CallerDetailsComponent;
  let fixture: ComponentFixture<CallerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
