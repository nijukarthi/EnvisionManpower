import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCandidateFixedCost } from './new-candidate-fixed-cost';

describe('NewCandidateFixedCost', () => {
  let component: NewCandidateFixedCost;
  let fixture: ComponentFixture<NewCandidateFixedCost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCandidateFixedCost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCandidateFixedCost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
