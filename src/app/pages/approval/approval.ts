import { Component, OnInit, ViewChild } from '@angular/core';
import { Shared } from '@/service/shared';
import { FormBuilder } from '@angular/forms';
import { Apiservice } from '@/service/apiservice/apiservice';
import { DemandStatus } from '@/models/demand-status/demand-status.enum';
import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-approval',
  imports: [Shared],
  templateUrl: './approval.html',
  styleUrl: './approval.scss'
})
export class Approval implements OnInit {
  demandProcessingList: any[] = [];
  requisitionDetails: any;

  USERGROUPS = UserGroups;
  DEMANDSTATUS = DemandStatus;
  APPROVALSTATUS = ApprovalStatus;
  
  loggedUserGroupId = Number(sessionStorage.getItem('userGroupId'));

  offSet = 0;
  pageSize = 10;
  first = 0;
  totalRecords = 0;
  filteredList: any[] = [];

  activeTab = 'processing';

  selectedApprovalList:any = [];
  viewDetail:boolean = false;
   loggedInUserDetails:any = "";
  departmentUser:boolean = false;
  clusterUser:boolean = false;


  constructor(private fb: FormBuilder, private apiService: Apiservice, private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchDemandRequest(102);
    this.fetchUserProfile();
  }

  fetchUserProfile(){
            this.apiService.fetchUserProfile('').subscribe({
                next: val => {
                    console.log(val);
                    this.loggedInUserDetails = val.data;
                    if(this.loggedInUserDetails){
                         if(this.loggedInUserDetails.userGroupId == 316 && this.loggedInUserDetails.userGroupName == 'Department Head'){
                            this.departmentUser = true;
                        }else if(this.loggedInUserDetails.userGroupId == 311 && this.loggedInUserDetails.userGroupName == 'Cluster Head'){
                            this.clusterUser = true;
                        }
                    }
                },
                error: err => {
                    console.log(err);
                }
            })
        }


  pageChange(event: any){
    console.log(event);
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    this.fetchDemandRequest(102);
  }

  setActiveTab(tab: string, status: number){
    this.activeTab = tab;
    this.fetchDemandRequest(status);
  }

  fetchDemandRequest(status: number){
    try {
      const data = {
        demandStatus: status,
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      console.log(data);
  
      this.apiService.fetchDemandRequest(data).subscribe({
        next: val => {
          console.log(val);
          this.demandProcessingList = val?.data?.data;
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
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Manpower Quantity Updated Successfully'});
          this.fetchDemandRequest(102);
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
            detail: type === 'Accepted' ? 'Manpower Successfully Accepted' : 'Manpower Rejected' });
          this.fetchDemandRequest(102);
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
            'Manpower Successfully Accepted' : 'Manpower Rejected'});
          this.fetchDemandRequest(102);
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

  @ViewChild('dt') dt!: Table;

searchText = "";
searchSpn = '';

applyFilter() {
  this.dt.filter(this.searchText, 'demandCode', 'contains');
  this.dt.filter(this.searchSpn, 'spn.spnCode', 'contains');
}

}
