import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignalItemComponent } from './signal-item.component';

describe('SignalItemComponent', () => {
  let component: SignalItemComponent;
  let fixture: ComponentFixture<SignalItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SignalItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
