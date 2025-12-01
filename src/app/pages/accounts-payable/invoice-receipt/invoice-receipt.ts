import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-receipt',
  imports: [Shared],
  templateUrl: './invoice-receipt.html',
  styleUrl: './invoice-receipt.scss'
})
export class InvoiceReceipt implements OnInit {
  offSet = 0;
  pageSize = 10;
  first = 0;
  totalRecords = 0;

  invoiceGRNList: any;

  constructor(private apiService: Apiservice){}

  ngOnInit(): void {
    this.fetchInvoiceGRNList();
  }

  fetchInvoiceGRNList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      console.log(data);

      this.apiService.invoiceGRNList(data).subscribe({
        next: val => {
          console.log(val);
          this.invoiceGRNList = val?.data?.data;
          this.totalRecords = val?.data?.length ?? 0;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

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

  pageChange(event: any){
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;

    this.fetchInvoiceGRNList();
  }

}
