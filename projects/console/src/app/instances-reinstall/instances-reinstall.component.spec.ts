import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancesReinstallComponent } from './instances-reinstall.component';

describe('InstancesReinstallComponent', () => {
  let component: InstancesReinstallComponent;
  let fixture: ComponentFixture<InstancesReinstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstancesReinstallComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstancesReinstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
