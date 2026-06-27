import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AccountStatsComponent } from './account-stats.component';

describe('AccountStatsComponent', () => {
  let component: AccountStatsComponent;
  let fixture: ComponentFixture<AccountStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AccountStatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
