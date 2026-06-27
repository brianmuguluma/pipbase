import { TestBed } from '@angular/core/testing';

import { VultrService } from './vultr.service';

describe('VultrService', () => {
  let service: VultrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VultrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
