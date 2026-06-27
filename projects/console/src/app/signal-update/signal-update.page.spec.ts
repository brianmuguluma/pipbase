import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalUpdatePage } from './signal-update.page';

describe('SignalUpdatePage', () => {
  let component: SignalUpdatePage;
  let fixture: ComponentFixture<SignalUpdatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SignalUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
