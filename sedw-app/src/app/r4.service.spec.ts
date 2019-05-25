import { TestBed } from '@angular/core/testing';

import { R4Service } from './r4.service';

describe('R4Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: R4Service = TestBed.get(R4Service);
    expect(service).toBeTruthy();
  });
});
