import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingEmployee } from './existing-employee';

describe('ExistingEmployee', () => {
  let component: ExistingEmployee;
  let fixture: ComponentFixture<ExistingEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExistingEmployee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingEmployee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
