import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstanceReinstallPage } from './instance-reinstall.page';

describe('InstanceReinstallPage', () => {
  let component: InstanceReinstallPage;
  let fixture: ComponentFixture<InstanceReinstallPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstanceReinstallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
