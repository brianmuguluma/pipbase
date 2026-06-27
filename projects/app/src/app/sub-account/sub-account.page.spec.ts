import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubAccountPage } from './sub-account.page';

describe('SubAccountPage', () => {
  let component: SubAccountPage;
  let fixture: ComponentFixture<SubAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
