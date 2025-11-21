import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSubmissionForm } from './invoice-submission-form';

describe('InvoiceSubmissionForm', () => {
  let component: InvoiceSubmissionForm;
  let fixture: ComponentFixture<InvoiceSubmissionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceSubmissionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceSubmissionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
