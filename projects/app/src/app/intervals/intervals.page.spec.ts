import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntervalsPage } from './intervals.page';

describe('IntervalsPage', () => {
  let component: IntervalsPage;
  let fixture: ComponentFixture<IntervalsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IntervalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
