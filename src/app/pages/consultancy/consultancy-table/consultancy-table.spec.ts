import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyTable } from './consultancy-table';

describe('ConsultancyTable', () => {
  let component: ConsultancyTable;
  let fixture: ComponentFixture<ConsultancyTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultancyTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultancyTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
