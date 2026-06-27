import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderItemBadgeComponent } from './order-item-badge.component';

describe('OrderItemBadgeComponent', () => {
  let component: OrderItemBadgeComponent;
  let fixture: ComponentFixture<OrderItemBadgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OrderItemBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
