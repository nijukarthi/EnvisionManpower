import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyForm } from './consultancy-form';

describe('ConsultancyForm', () => {
  let component: ConsultancyForm;
  let fixture: ComponentFixture<ConsultancyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultancyForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultancyForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
