import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transfer',
  imports: [Shared],
  templateUrl: './transfer.html',
  styleUrl: './transfer.scss'
})
export class Transfer implements OnInit {
  offSet = 0;
  pageSize = 10;

  transferredEmployeeList: any;

  currentUserRole = Number(sessionStorage.getItem('userGroupId'));

  APPROVALSTATUS = ApprovalStatus;
  USERGROUPS = UserGroups;

  constructor(private apiService: Apiservice, private messageService: MessageService){}

  ngOnInit(): void {
    this.fetchTransferedList();
  }

  fetchTransferedList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        transferStatus: 102
      }
      this.apiService.fetchTransferredEmployeeList(data).subscribe({
        next: val => {
          console.log(val);
          this.transferredEmployeeList = val.data.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  clusterHeadApproval(transferId: number, type: 'Accepted' | 'Rejected'){
    try {
      const data = {
        transferId: transferId,
        approvalStatus: type === 'Accepted' ? ApprovalStatus.ACCEPTED : ApprovalStatus.REJECTED
      }
      console.log(data);
      this.apiService.approveTransferClusterHead(data).subscribe({
        next: val => {
          console.log(val);
          if (type === 'Accepted') {    
            this.messageService.add({severity: 'success', summary: 'Success', 
              detail: 'Transfer Request Accepted Successfully'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Transfer Request Rejected'});
          }
          this.fetchTransferedList();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  departmentHeadApproval(transferId: number, type: 'Accepted' | 'Rejected'){
    try {
      const data = {
        transferId: transferId,
        approvalStatus: type === 'Accepted' ? ApprovalStatus.ACCEPTED : ApprovalStatus.REJECTED
      }
      console.log(data);

      this.apiService.approveTransferDeptHead(data).subscribe({
        next: val => {
          console.log(val);
          if (type === 'Accepted') {    
            this.messageService.add({severity: 'success', summary: 'Success', 
              detail: 'Transfer Request Accepted Successfully'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Transfer Request Rejected'});
          }
          this.fetchTransferedList();
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
