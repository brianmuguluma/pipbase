import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignalsCardComponent } from './signals-card.component';

describe('SignalsCardComponent', () => {
  let component: SignalsCardComponent;
  let fixture: ComponentFixture<SignalsCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SignalsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
