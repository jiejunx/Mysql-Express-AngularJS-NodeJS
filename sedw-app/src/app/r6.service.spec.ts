import { TestBed } from '@angular/core/testing';

import { R6Service } from './r6.service';

describe('R6Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: R6Service = TestBed.get(R6Service);
    expect(service).toBeTruthy();
  });
});
