import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnRollEmployees } from './on-roll-employees';

describe('OnRollEmployees', () => {
  let component: OnRollEmployees;
  let fixture: ComponentFixture<OnRollEmployees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnRollEmployees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnRollEmployees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
