import { TestBed } from '@angular/core/testing';

import { EnvisionRoles } from './envision-roles';

describe('EnvisionRoles', () => {
  let service: EnvisionRoles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvisionRoles);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
