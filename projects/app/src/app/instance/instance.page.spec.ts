import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstancePage } from './instance.page';

describe('InstancePage', () => {
  let component: InstancePage;
  let fixture: ComponentFixture<InstancePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
