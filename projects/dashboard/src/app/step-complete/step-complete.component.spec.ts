import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StepCompleteComponent } from './step-complete.component';

describe('StepCompleteComponent', () => {
  let component: StepCompleteComponent;
  let fixture: ComponentFixture<StepCompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StepCompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
