import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TradeDependantsComponent } from './trade-dependants.component';

describe('TradeDependantsComponent', () => {
  let component: TradeDependantsComponent;
  let fixture: ComponentFixture<TradeDependantsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TradeDependantsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TradeDependantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
