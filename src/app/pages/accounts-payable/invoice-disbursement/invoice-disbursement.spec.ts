import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDisbursement } from './invoice-disbursement';

describe('InvoiceDisbursement', () => {
  let component: InvoiceDisbursement;
  let fixture: ComponentFixture<InvoiceDisbursement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDisbursement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDisbursement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
