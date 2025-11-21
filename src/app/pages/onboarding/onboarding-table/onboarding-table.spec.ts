import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingTable } from './onboarding-table';

describe('OnboardingTable', () => {
  let component: OnboardingTable;
  let fixture: ComponentFixture<OnboardingTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
