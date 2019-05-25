import { TestBed } from '@angular/core/testing';

import { R7Service } from './r7.service';

describe('R7Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: R7Service = TestBed.get(R7Service);
    expect(service).toBeTruthy();
  });
});
