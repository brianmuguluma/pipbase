import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PositionClosePage } from './position-close.page';

describe('PositionClosePage', () => {
  let component: PositionClosePage;
  let fixture: ComponentFixture<PositionClosePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PositionClosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
