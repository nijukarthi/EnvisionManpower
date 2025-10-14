import { TestBed } from '@angular/core/testing';

import { Usergroup } from './usergroup';

describe('Usergroup', () => {
  let service: Usergroup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Usergroup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
