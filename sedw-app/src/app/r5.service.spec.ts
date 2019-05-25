import { TestBed } from '@angular/core/testing';

import { R5Service } from './r5.service';

describe('R5Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: R5Service = TestBed.get(R5Service);
    expect(service).toBeTruthy();
  });
});
