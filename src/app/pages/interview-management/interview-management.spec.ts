import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewManagement } from './interview-management';

describe('InterviewManagement', () => {
  let component: InterviewManagement;
  let fixture: ComponentFixture<InterviewManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
