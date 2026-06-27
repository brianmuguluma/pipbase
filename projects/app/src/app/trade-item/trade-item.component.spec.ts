import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TradeItemComponent } from './trade-item.component';

describe('TradeItemComponent', () => {
  let component: TradeItemComponent;
  let fixture: ComponentFixture<TradeItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TradeItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TradeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
