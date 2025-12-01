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

  openGRNModal = false;

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

  getSeverity(status: string){
    switch(status){
      case 'SUBMITTED':
        return 'primary';
      case 'GRN_IN_PROCESS':
        return 'primary';
      case 'GRN_COMPLETED':
        return 'success';
      case 'GRN_REVERSED':
        return 'warn';
      case 'UNDER_DISBURSEMENT_REVIEW':
        return 'info';
      case 'DISBURSEMENT_IN_PROGRESS':
        return 'primary';
      case 'RETURNED_TO_GRN':
        return 'info';
      case 'REJECTED':
        return 'danger';
      case 'PAYMENT_APPROVED':
        return 'success';
      case 'PAID':
        return 'success';
      default:
        return 'primary';
    }
  }

  pageChange(event: any){
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;

    this.fetchInvoiceGRNList();
  }

}
