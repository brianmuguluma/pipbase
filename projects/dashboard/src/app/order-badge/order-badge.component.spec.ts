import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrderBadgeComponent } from './order-badge.component';

describe('OrderBadgeComponent', () => {
  let component: OrderBadgeComponent;
  let fixture: ComponentFixture<OrderBadgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OrderBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
