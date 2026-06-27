import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OandaPage } from './oanda.page';

describe('OandaPage', () => {
  let component: OandaPage;
  let fixture: ComponentFixture<OandaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OandaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
