import { TestBed } from '@angular/core/testing';

import { Cluster } from './cluster';

describe('Cluster', () => {
  let service: Cluster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cluster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
