import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PositionAccordionComponent } from './position-accordion.component';

describe('PositionAccordionComponent', () => {
  let component: PositionAccordionComponent;
  let fixture: ComponentFixture<PositionAccordionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PositionAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PositionAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
