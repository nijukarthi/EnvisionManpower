import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingCandidateFixedCost } from './existing-candidate-fixed-cost';

describe('ExistingCandidateFixedCost', () => {
  let component: ExistingCandidateFixedCost;
  let fixture: ComponentFixture<ExistingCandidateFixedCost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExistingCandidateFixedCost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingCandidateFixedCost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
