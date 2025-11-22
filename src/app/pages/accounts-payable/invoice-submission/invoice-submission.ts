import { Shared } from '@/service/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-submission',
  imports: [Shared],
  templateUrl: './invoice-submission.html',
  styleUrl: './invoice-submission.scss'
})
export class InvoiceSubmission {
  invoiceSubmissionList = [
    {
      poNumber: "PO-2025-01004",
      entityName: 'Cloute Technologies Pvt. Ltd.',
      gstIn: '29AACCC1234F1Z5',
      address: '3rd Floor, Tech Park, Bengaluru, Karnataka - 560001',
      pod: '-',
      hsnSacCode: '998314',
      sealAndSign: '-',
      poCopy: 'Yes',
      invoiceNo: '8499',
      invoiceDate: '2025-10-20',
      submittedDate: '2025-10-28',
      submittedTo: 'Accounts Department'
    },
    {
      poNumber: "PO-2025-01005",
      entityName: 'Win Enterprises Pvt. Ltd.',
      gstIn: '33AACCI5678K1Z8',
      address: 'No.12, Mount Road, Chennai, Tamil Nadu - 600002',
      pod: '-',
      hsnSacCode: '998312',
      sealAndSign: '-',
      poCopy: 'No',
      invoiceNo: '2478',
      invoiceDate: '2025-10-25',
      submittedDate: '2025-10-30',
      submittedTo: 'Finance Team'
    },
    {
      poNumber: "PO-2025-01006",
      entityName: 'TechnoServe Consulting LLP',
      gstIn: '27AAACT7890G1Z2',
      address: '5th Avenue, Andheri East, Mumbai, Maharashtra - 400059',
      pod: '-',
      hsnSacCode: '998313',
      sealAndSign: '-',
      poCopy: 'Yes',
      invoiceNo: '8908',
      invoiceDate: '2025-10-28',
      submittedDate: '2025-11-01',
      submittedTo: 'Admin Department'
    }
  ];

}
