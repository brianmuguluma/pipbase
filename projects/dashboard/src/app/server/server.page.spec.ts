import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerPage } from './server.page';

describe('ServerPage', () => {
  let component: ServerPage;
  let fixture: ComponentFixture<ServerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ServerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
