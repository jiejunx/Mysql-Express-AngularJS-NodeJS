import { TestBed } from '@angular/core/testing';

import { A1Service } from './a1.service';

describe('A1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: A1Service = TestBed.get(A1Service);
    expect(service).toBeTruthy();
  });
});
