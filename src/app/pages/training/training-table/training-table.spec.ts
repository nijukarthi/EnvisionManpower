import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTable } from './training-table';

describe('TrainingTable', () => {
  let component: TrainingTable;
  let fixture: ComponentFixture<TrainingTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
