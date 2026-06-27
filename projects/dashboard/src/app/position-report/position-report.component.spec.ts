import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PositionReportComponent } from './position-report.component';

describe('PositionReportComponent', () => {
  let component: PositionReportComponent;
  let fixture: ComponentFixture<PositionReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PositionReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PositionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
