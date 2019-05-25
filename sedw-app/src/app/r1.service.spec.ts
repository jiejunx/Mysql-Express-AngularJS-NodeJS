import { TestBed } from '@angular/core/testing';

import { R1Service } from './r1.service';

describe('R1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: R1Service = TestBed.get(R1Service);
    expect(service).toBeTruthy();
  });
});
