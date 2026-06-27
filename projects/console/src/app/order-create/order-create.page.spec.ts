import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderCreatePage } from './order-create.page';

describe('OrderCreatePage', () => {
  let component: OrderCreatePage;
  let fixture: ComponentFixture<OrderCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrderCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
