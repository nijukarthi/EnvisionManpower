import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private apiService: Apiservice, private router: Router){}

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

  getMenuItems(submission: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.router.navigate(['/home/invoice-submission', submission.invoiceId])
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash'
      }
    ]
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
    this.fetchInvoiceSubmissionList();
  }
}
