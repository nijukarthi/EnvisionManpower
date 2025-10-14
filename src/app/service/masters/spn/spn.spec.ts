import { TestBed } from '@angular/core/testing';

import { Spn } from './spn';

describe('Spn', () => {
  let service: Spn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Spn);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
