import { TestBed } from '@angular/core/testing';

import { Manifiestos } from './manifiestos';

describe('Manifiestos', () => {
  let service: Manifiestos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Manifiestos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
