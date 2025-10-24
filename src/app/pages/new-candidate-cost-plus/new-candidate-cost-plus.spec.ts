import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCandidateCostPlus } from './new-candidate-cost-plus';

describe('NewCandidateCostPlus', () => {
  let component: NewCandidateCostPlus;
  let fixture: ComponentFixture<NewCandidateCostPlus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCandidateCostPlus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCandidateCostPlus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
