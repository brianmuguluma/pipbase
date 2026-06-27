import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PositionItemComponent } from './position-item.component';

describe('PositionItemComponent', () => {
  let component: PositionItemComponent;
  let fixture: ComponentFixture<PositionItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PositionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PositionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
