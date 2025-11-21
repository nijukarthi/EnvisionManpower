import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-terminate',
  imports: [Shared],
  templateUrl: './terminate.html',
  styleUrl: './terminate.scss'
})
export class Terminate implements OnInit {
  offSet = 0;
  pageSize = 10;
  first = 0;
  resignationListLength = 0;
  activeTab = 'processing';

  resignationList: any;

  APPROVALSTATUS = ApprovalStatus;
  USERGROUPS = UserGroups;

  constructor(private apiService: Apiservice, private messageService: MessageService){}

  ngOnInit(): void {
      this.fetchResignationList(102);
  }

  setActiveTab(tab: string, status: number) {
    this.activeTab = tab;
    console.log(this.activeTab);
    this.fetchResignationList(status);
  }


  fetchResignationList(status: number){
    try {
      console.log(status);
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        resignationStatus: status
      }
      console.log(data);

      this.apiService.fetchResignationList(data).subscribe({
        next: val => {
          console.log(val);
          this.resignationList = val?.data?.data;
          this.resignationListLength = val?.data?.length ?? 0; 
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  clusterHeadApproval(resignationId: number, type: 'Accepted' | 'Rejected'){
    try {
      const data = {
        resignationId: resignationId,
        approvalStatus: type === 'Accepted' ? ApprovalStatus.ACCEPTED : ApprovalStatus.REJECTED
      }

      console.log(data);

      this.apiService.approveResignClusterHead(data).subscribe({
        next: val => {
          console.log(val);
          if (type === 'Accepted') {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Resignation Request Accepted'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Resignation Request Rejected'});
          }
          this.fetchResignationList(102);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  departmentHeadApproval(resignationId: number, type: 'Accepted' | 'Rejected'){
    try {
      const data = {
        resignationId: resignationId,
        approvalStatus: type === 'Accepted' ? ApprovalStatus.ACCEPTED : ApprovalStatus.REJECTED
      }
      console.log(data);

      this.apiService.approveResignDeptHead(data).subscribe({
        next: val => {
          console.log(val);
          if (type === 'Accepted') {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Resignation Request Accepted'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Resignation Request Rejected'});
          }
          this.fetchResignationList(102);
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
    this.fetchResignationList(102);
  }
}
