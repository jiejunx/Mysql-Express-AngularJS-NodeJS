import { TestBed } from '@angular/core/testing';

import { A3Service } from './a3.service';

describe('A3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: A3Service = TestBed.get(A3Service);
    expect(service).toBeTruthy();
  });
});
