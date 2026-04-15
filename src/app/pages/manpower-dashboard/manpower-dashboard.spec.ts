import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManpowerDashboard } from './manpower-dashboard';

describe('ManpowerDashboard', () => {
  let component: ManpowerDashboard;
  let fixture: ComponentFixture<ManpowerDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManpowerDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManpowerDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
