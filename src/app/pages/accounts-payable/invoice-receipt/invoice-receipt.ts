import { Shared } from '@/service/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-receipt',
  imports: [Shared],
  templateUrl: './invoice-receipt.html',
  styleUrl: './invoice-receipt.scss'
})
export class InvoiceReceipt {
  invoiceReceiptList = [
    {
      recipient: 'Anuja Sharma',
      poNumber: 'PO-2025-1001',
      poUnitPrice: 25000,
      poUnitQty: 2,
      poValue: 50000,
      invoiceNumber: 'INV-CLT-4501',
      invoiceDate: '2025-10-28',
      taxRate: '18%',
      invoiceAmount: 59000,
      grnQty: 2,
      serviceLocation: 'Bengaluru, Karnataka',
      description: 'Software Development Services for October 2025',
      consultancyName: 'Cloute Technologies Pvt. Ltd.',
      grnNumber: 'GRN-78945',
      grnStatus: 'Approved',
      grnDoneDate: '2025-10-29',
      submittedTo: 'Finance Department',
      submittedDate: '2025-10-30',
      grnReverseNumber: '',
      grnReverseReason: ''
    },
    {
      recipient: 'Rohit Kumar',
      poNumber: 'PO-2025-1002',
      poUnitPrice: 18000,
      poUnitQty: 3,
      poValue: 54000,
      invoiceNumber: 'INV-IWIN-2203',
      invoiceDate: '2025-10-25',
      taxRate: '18%',
      invoiceAmount: 63720,
      grnQty: 3,
      serviceLocation: 'Chennai, Tamil Nadu',
      description: 'Recruitment Consultancy Services for Store Executives',
      consultancyName: 'Win Enterprises Pvt. Ltd.',
      grnNumber: 'GRN-78946',
      grnStatus: 'Approved',
      grnDoneDate: '2025-10-27',
      submittedTo: 'Accounts Team',
      submittedDate: '2025-10-28',
      grnReverseNumber: '',
      grnReverseReason: ''
    },
    {
      recipient: 'Priya Nair',
      poNumber: 'PO-2025-1003',
      poUnitPrice: 15000,
      poUnitQty: 4,
      poValue: 60000,
      invoiceNumber: 'INV-TECH-5019',
      invoiceDate: '2025-11-01',
      taxRate: '18%',
      invoiceAmount: 70800,
      grnQty: 4,
      serviceLocation: 'Mumbai, Maharashtra',
      description: 'Annual Maintenance Services for IT Infrastructure',
      consultancyName: 'TechnoServe Consulting LLP',
      grnNumber: 'GRN-78947',
      grnStatus: 'Reversed',
      grnDoneDate: '2025-11-02',
      submittedTo: 'Admin Department',
      submittedDate: '2025-11-03',
      grnReverseNumber: 'REV-2025-3001',
      grnReverseReason: 'Incorrect PO Mapping'
    }
  ];

}
