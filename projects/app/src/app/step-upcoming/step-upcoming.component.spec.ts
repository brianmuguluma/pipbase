import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepUpcomingComponent } from './step-upcoming.component';

describe('StepUpcomingComponent', () => {
  let component: StepUpcomingComponent;
  let fixture: ComponentFixture<StepUpcomingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StepUpcomingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
