import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PositionsReportComponent } from './positions-report.component';

describe('PositionsReportComponent', () => {
  let component: PositionsReportComponent;
  let fixture: ComponentFixture<PositionsReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PositionsReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PositionsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
