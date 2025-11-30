import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-submission',
  imports: [Shared],
  templateUrl: './invoice-submission.html',
  styleUrl: './invoice-submission.scss'
})
export class InvoiceSubmission implements OnInit {
  offSet = 0;
  pageSize = 10;

  invoiceSubmissionList: any;

  constructor(private apiService: Apiservice){}

  ngOnInit(): void {
    this.fetchInvoiceSubmissionList();
  }

  fetchInvoiceSubmissionList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      this.apiService.fetchInvoiceSubmissionList(data).subscribe({
        next: val => {
          console.log(val);
          this.invoiceSubmissionList = val?.data?.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
