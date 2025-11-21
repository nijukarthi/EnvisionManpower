import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReceipt } from './invoice-receipt';

describe('InvoiceReceipt', () => {
  let component: InvoiceReceipt;
  let fixture: ComponentFixture<InvoiceReceipt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceReceipt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceReceipt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
