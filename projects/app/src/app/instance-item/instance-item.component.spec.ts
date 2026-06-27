import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstanceItemComponent } from './instance-item.component';

describe('InstanceItemComponent', () => {
  let component: InstanceItemComponent;
  let fixture: ComponentFixture<InstanceItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InstanceItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstanceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
