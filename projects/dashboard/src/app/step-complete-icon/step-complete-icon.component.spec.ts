import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StepCompleteIconComponent } from './step-complete-icon.component';

describe('StepCompleteIconComponent', () => {
  let component: StepCompleteIconComponent;
  let fixture: ComponentFixture<StepCompleteIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StepCompleteIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepCompleteIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
