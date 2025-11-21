import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostPlusCandidateForm } from './cost-plus-candidate-form';

describe('CostPlusCandidateForm', () => {
  let component: CostPlusCandidateForm;
  let fixture: ComponentFixture<CostPlusCandidateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostPlusCandidateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostPlusCandidateForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
