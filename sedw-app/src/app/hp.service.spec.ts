import { TestBed } from '@angular/core/testing';

import { HpService } from './hp.service';

describe('HpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HpService = TestBed.get(HpService);
    expect(service).toBeTruthy();
  });
});
