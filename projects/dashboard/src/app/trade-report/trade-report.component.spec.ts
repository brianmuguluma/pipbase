import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TradeReportComponent } from './trade-report.component';

describe('TradeReportComponent', () => {
  let component: TradeReportComponent;
  let fixture: ComponentFixture<TradeReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TradeReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TradeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
