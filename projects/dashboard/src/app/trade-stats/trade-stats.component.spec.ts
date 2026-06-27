import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TradeStatsComponent } from './trade-stats.component';

describe('TradeStatsComponent', () => {
  let component: TradeStatsComponent;
  let fixture: ComponentFixture<TradeStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TradeStatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TradeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
