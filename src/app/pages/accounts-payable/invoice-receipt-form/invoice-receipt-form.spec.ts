import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReceiptForm } from './invoice-receipt-form';

describe('InvoiceReceiptForm', () => {
  let component: InvoiceReceiptForm;
  let fixture: ComponentFixture<InvoiceReceiptForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceReceiptForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceReceiptForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
