import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StepSeperatorComponent } from './step-seperator.component';

describe('StepSeperatorComponent', () => {
  let component: StepSeperatorComponent;
  let fixture: ComponentFixture<StepSeperatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StepSeperatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepSeperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
