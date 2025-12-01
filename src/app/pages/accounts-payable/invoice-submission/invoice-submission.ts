import { UserGroups } from '@/models/usergroups/usergroups.enum';
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
  first = 0;
  totalRecords = 0;

  invoiceSubmissionList: any;

  USERGROUPS = UserGroups;

  currentUserRole = Number(sessionStorage.getItem('userGroupId'));

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

  pageChange(event: any){
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    this.fetchInvoiceSubmissionList();
  }
}
