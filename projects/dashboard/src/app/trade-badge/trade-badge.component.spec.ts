import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TradeBadgeComponent } from './trade-badge.component';

describe('TradeBadgeComponent', () => {
  let component: TradeBadgeComponent;
  let fixture: ComponentFixture<TradeBadgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TradeBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TradeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
