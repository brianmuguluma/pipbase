import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalsPage } from './signals.page';

describe('SignalsPage', () => {
  let component: SignalsPage;
  let fixture: ComponentFixture<SignalsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SignalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
