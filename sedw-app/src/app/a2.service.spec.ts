import { TestBed } from '@angular/core/testing';

import { A2Service } from './a2.service';

describe('A2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: A2Service = TestBed.get(A2Service);
    expect(service).toBeTruthy();
  });
});
