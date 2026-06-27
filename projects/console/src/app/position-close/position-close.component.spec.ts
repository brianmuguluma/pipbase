import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionCloseComponent } from './position-close.component';

describe('PositionCloseComponent', () => {
  let component: PositionCloseComponent;
  let fixture: ComponentFixture<PositionCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionCloseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PositionCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
