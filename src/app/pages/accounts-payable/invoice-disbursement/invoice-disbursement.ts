import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-disbursement',
  imports: [Shared],
  templateUrl: './invoice-disbursement.html',
  styleUrl: './invoice-disbursement.scss'
})
export class InvoiceDisbursement implements OnInit {
  offSet = 0;
  pageSize = 10;

  invoiceDisbursementList: any;

  constructor(private apiService: Apiservice){}

  ngOnInit(): void {
    this.fetchDisbursementList();
  }

  fetchDisbursementList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      console.log(data);

      this.apiService.fetchDisbursementList(data).subscribe({
        next: val => {
          console.log(val);
          this.invoiceDisbursementList = val?.data?.data;
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
}
