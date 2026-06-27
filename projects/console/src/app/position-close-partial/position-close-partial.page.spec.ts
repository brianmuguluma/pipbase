import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PositionClosePartialPage } from './position-close-partial.page';

describe('PositionClosePartialPage', () => {
  let component: PositionClosePartialPage;
  let fixture: ComponentFixture<PositionClosePartialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PositionClosePartialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
