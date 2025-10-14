import { TestBed } from '@angular/core/testing';

import { CompanyUsers } from './company-users';

describe('CompanyUsers', () => {
  let service: CompanyUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyUsers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
