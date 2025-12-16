import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-transfer',
  imports: [Shared],
  templateUrl: './transfer.html',
  styleUrl: './transfer.scss'
})
export class Transfer implements OnInit {
  offSet = 0;
  pageSize = 10;
  first = 0;
  transferredListLength = 0;
  selectedTransferId = 0;

  isEnableBtn = false;

  activeTab = 'processing';

  transferredEmployeeList: any;

  currentUserRole = Number(sessionStorage.getItem('userGroupId'));

  APPROVALSTATUS = ApprovalStatus;
  USERGROUPS = UserGroups;

  statusMap: any = {
    102: { label: 'Processing', severity: 'warn' },
    108: { label: 'Scheduled', severity: 'primary'},
    200: { label: 'Completed', severity: 'success' },
    406: { label: 'Rejected', severity: 'danger' }
  }

  constructor(private apiService: Apiservice, private messageService: MessageService, private confirmationService: ConfirmationService){}

  ngOnInit(): void {
    this.fetchTransferedList(102);
  }

  setActiveTab(tab: string, status: number){
    this.activeTab = tab;
    this.fetchTransferedList(status);
  }

  fetchTransferedList(status: number){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        transferStatus: status
      }
      this.apiService.fetchTransferredEmployeeList(data).subscribe({
        next: val => {
          console.log(val);
          this.transferredEmployeeList = val?.data?.data;
          this.transferredListLength = val?.data?.length ?? 0;
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
          this.fetchTransferedList(102);
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
          this.fetchTransferedList(102);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  selectedEmployee(transferId: number){
    this.selectedTransferId = transferId;
  }

  unSelectedEmployee(){
    this.selectedTransferId = 0;
  }

  transferConfirmPopup(){
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please Type Confirm to Proceed.',
      accept: () => {
        
      },
      reject: () => {
        this.isEnableBtn = false;
      }
    })
  }

  typedValue(event: any){
    // console.log(event);

    if (event.target.value === 'Confirm') {
      this.isEnableBtn = true;
    } else{
      this.isEnableBtn = false;
    }
  }

  getMenuItems(){
    return [
      {
        label: 'Force Transfer',
        icon: 'pi pi-bolt',
        command: () => this.transferConfirmPopup()
      },
      {
        label: 'Cancel Transfer',
        icon: 'pi pi-times'
      }
    ]
  }

  getStatusLabel(status: number){
    return this.statusMap[status]?.label ?? 'UnKnown';
  }

  getSeverity(status: number): string{
    return this.statusMap[status]?.severity ?? 'primary';
  }

  pageChange(event: any){
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    this.fetchTransferedList(102);
  }
}
