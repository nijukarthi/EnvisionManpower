import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoAssignTable } from './po-assign-table';

describe('PoAssignTable', () => {
  let component: PoAssignTable;
  let fixture: ComponentFixture<PoAssignTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoAssignTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoAssignTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
