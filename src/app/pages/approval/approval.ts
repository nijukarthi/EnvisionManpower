import { Component, OnInit } from '@angular/core';
import { Shared } from '@/service/shared';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apiservice } from '@/service/apiservice/apiservice';
import { DemandStatus } from '@/models/demand-status/demand-status.enum';
import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-approval',
  imports: [Shared],
  templateUrl: './approval.html',
  styleUrl: './approval.scss'
})
export class Approval implements OnInit {
  demandProcessingList: any;
  requisitionDetails: any;

  USERGROUPS = UserGroups;
  DEMANDSTATUS = DemandStatus;
  APPROVALSTATUS = ApprovalStatus;
  
  loggedUserGroupId = Number(sessionStorage.getItem('userGroupId'));

  offSet = 0;
  pageSize = 10;
  first = 0;
  demandProcessingListLength = 0;

  selectedApprovalList:any = [];
  viewDetail:boolean = false;

  constructor(private fb: FormBuilder, private apiService: Apiservice, private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchDemandRequest();
  }

  pageChange(event: any){
    console.log(event);
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    this.fetchDemandRequest();
  }

  fetchDemandRequest(){
    try {
      const data = {
        demandStatus: DemandStatus.PROCESSING,
        offSet: this.offSet,
        pageSize: this.pageSize
      }
  
      this.apiService.fetchDemandRequest(data).subscribe({
        next: val => {
          console.log(val);
          this.demandProcessingList = val?.data?.data;
          this.demandProcessingListLength = val?.data.length;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  demandQtyChange(demandId: number, quantity: number){
    try {  
      console.log(quantity);
  
      const data = {
        demandId: demandId,
        quantity: quantity
      }
  
      this.apiService.editDemandQuantity(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Demand Quantity Updated Successfully'});
          this.fetchDemandRequest();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  clusterHeadApproval(demandId: number, type: 'Accepted' | 'Rejected'){
    try {
      console.log(demandId);

      const data = {
        demandId: demandId,
        approvalStatus: type === 'Accepted' ? 200 : 406
      }

      this.apiService.approveDemandByClusterHead(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', 
            detail: type === 'Accepted' ? 'Demand Successfully Accepted' : 'Demand Rejected' });
          this.fetchDemandRequest();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  departmentHeadApproval(demandId: number, type: 'Accepted' | 'Rejected'){
    try {
      console.log(demandId);

      const data = {
        demandId: demandId,
        approvalStatus: type === 'Accepted' ? 200 : 406
      }

      this.apiService.approveDemandByDepartmentHead(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: type === 'Accepted' ? 
            'Demand Successfully Accepted' : 'Demand Rejected'});
          this.fetchDemandRequest();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }


  showDetailPopup(requesitionId:number){
    try {
      this.viewDetail = true;

      const data = {
        requesitionId: requesitionId
      }

      this.apiService.viewRequisition(data).subscribe({
        next: val => {
          console.log(val);
          this.requisitionDetails = val.data;
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
