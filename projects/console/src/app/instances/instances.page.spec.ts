import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstancesPage } from './instances.page';

describe('InstancesPage', () => {
  let component: InstancesPage;
  let fixture: ComponentFixture<InstancesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
