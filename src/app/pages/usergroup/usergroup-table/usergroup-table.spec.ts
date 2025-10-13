import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupTable } from './usergroup-table';

describe('UsergroupTable', () => {
  let component: UsergroupTable;
  let fixture: ComponentFixture<UsergroupTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsergroupTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsergroupTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
