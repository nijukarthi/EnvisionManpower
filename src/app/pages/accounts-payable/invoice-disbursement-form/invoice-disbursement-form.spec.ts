import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDisbursementForm } from './invoice-disbursement-form';

describe('InvoiceDisbursementForm', () => {
  let component: InvoiceDisbursementForm;
  let fixture: ComponentFixture<InvoiceDisbursementForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDisbursementForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDisbursementForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
