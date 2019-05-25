import { TestBed } from '@angular/core/testing';

import { R3Service } from './r3.service';

describe('R3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: R3Service = TestBed.get(R3Service);
    expect(service).toBeTruthy();
  });
});
