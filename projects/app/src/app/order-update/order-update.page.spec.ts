import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderUpdatePage } from './order-update.page';

describe('OrderUpdatePage', () => {
  let component: OrderUpdatePage;
  let fixture: ComponentFixture<OrderUpdatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrderUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
