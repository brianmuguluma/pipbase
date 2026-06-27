import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvatarInitialComponent } from './avatar-initial.component';

describe('AvatarInitialComponent', () => {
  let component: AvatarInitialComponent;
  let fixture: ComponentFixture<AvatarInitialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarInitialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarInitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
