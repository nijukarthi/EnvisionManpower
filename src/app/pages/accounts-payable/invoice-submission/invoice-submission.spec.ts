import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSubmission } from './invoice-submission';

describe('InvoiceSubmission', () => {
  let component: InvoiceSubmission;
  let fixture: ComponentFixture<InvoiceSubmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceSubmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceSubmission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
