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
      entityName: 'Cloute Technologies Pvt. Ltd.',
      gstIn: '29AACCC1234F1Z5',
      address: '3rd Floor, Tech Park, Bengaluru, Karnataka - 560001',
      pod: '-',
      hsnSacCode: '998314',
      sealAndSign: '-',
      poCopy: '-',
      submittedDate: '2025-10-28',
      submittedTo: 'Accounts Department'
    },
    {
      entityName: 'Win Enterprises Pvt. Ltd.',
      gstIn: '33AACCI5678K1Z8',
      address: 'No.12, Mount Road, Chennai, Tamil Nadu - 600002',
      pod: '-',
      hsnSacCode: '998312',
      sealAndSign: '-',
      poCopy: '-',
      submittedDate: '2025-10-30',
      submittedTo: 'Finance Team'
    },
    {
      entityName: 'TechnoServe Consulting LLP',
      gstIn: '27AAACT7890G1Z2',
      address: '5th Avenue, Andheri East, Mumbai, Maharashtra - 400059',
      pod: '-',
      hsnSacCode: '998313',
      sealAndSign: '-',
      poCopy: '-',
      submittedDate: '2025-11-01',
      submittedTo: 'Admin Department'
    }
  ];

}
