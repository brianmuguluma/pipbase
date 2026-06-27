import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakEvenComponent } from './break-even.component';

describe('BreakEvenComponent', () => {
  let component: BreakEvenComponent;
  let fixture: ComponentFixture<BreakEvenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakEvenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreakEvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
