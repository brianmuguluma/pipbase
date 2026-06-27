import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StepCurrentComponent } from './step-current.component';

describe('StepCurrentComponent', () => {
  let component: StepCurrentComponent;
  let fixture: ComponentFixture<StepCurrentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StepCurrentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
