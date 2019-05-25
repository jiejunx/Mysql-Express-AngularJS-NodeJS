import { TestBed } from '@angular/core/testing';

import { R2Service } from './r2.service';

describe('R2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: R2Service = TestBed.get(R2Service);
    expect(service).toBeTruthy();
  });
});
