import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpnTable } from './spn-table';

describe('SpnTable', () => {
  let component: SpnTable;
  let fixture: ComponentFixture<SpnTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpnTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpnTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
