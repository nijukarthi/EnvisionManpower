import { Component, OnInit, ViewChild } from '@angular/core';
import { Shared } from '@/service/shared';
import { FormBuilder } from '@angular/forms';
import { Apiservice } from '@/service/apiservice/apiservice';
import { DemandStatus } from '@/models/demand-status/demand-status.enum';
import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { MessageService } from 'primeng/api';
import { Column } from '@/models/table-column/table-column';

@Component({
  selector: 'app-approval',
  imports: [Shared],
  templateUrl: './approval.html',
  styleUrl: './approval.scss'
})
export class Approval implements OnInit {
  @ViewChild('dt') dt: any;

  demandProcessingList: any[] = [];
  requisitionDetails: any;

  statuses: any[] = [];

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
  searchValue = '';
  searchText: string = '';

  selectedApprovalList:any = [];
  viewDetail:boolean = false;
  loggedInUserDetails:any = "";
  departmentUser:boolean = false;
  clusterUser:boolean = false;

  statusMap: any = {
    102: { label: 'Processing', severity: 'warn' },
    200: { label: 'Completed', severity: 'success' },
    406: { label: 'Rejected', severity: 'danger' }
  }

  filters = {
    status: [{ value: [102], matchMode: 'equals' }]
  };

  selectedStatuses: number[] = [102];

  constructor(private fb: FormBuilder, private apiService: Apiservice, private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchDemandRequest();
    this.fetchUserProfile();

    this.statuses = [
      { label: 'Processing', value: 102 },
      { label: 'Completed', value: 200 },
      { label: 'Rejected', value: 406 }
    ];
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

  manpowerApprovalApi(data: any){
    try {
      this.apiService.fetchDemandRequest(data).subscribe({
        next: val => {
          console.log(val);
          this.demandProcessingList = val?.data?.data;
          this.totalRecords = val?.data?.length ?? 0;
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail });
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchDemandRequest(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        demandStatus: [102]
      }

      console.log(data);
  
      this.manpowerApprovalApi(data);
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
            detail: type === 'Accepted' ? 'Manpower Successfully Accepted' : 'Manpower Rejected' });
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
            'Manpower Successfully Accepted' : 'Manpower Rejected'});
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

  loadDemands(event: any) {
    try {   
      this.first = event.first;
      this.offSet = event.first / event.rows;
      this.pageSize = event.rows;
  
      const filters = event.filters;
      // console.log(filters.demandCode[0]?.value);
      // console.log(filters.spnCode[0]?.value);
      console.log(filters);
  
      const payload: any = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        demandStatus: filters?.status?.[0]?.value ?? [102],
        demandCode: filters?.demandCode?.[0]?.value ?? '',
        spnCode: filters?.spnCode?.[0]?.value ?? '',
        spnDescription: filters?.spnDescription?.[0].value ?? '',
        experience: filters?.experience?.[0].value ?? '',
        envisionRoleName: filters?.role?.[0].value ?? ''
      };

      console.log(payload);

      this.manpowerApprovalApi(payload);
    } catch (error) {
      console.log(error);
    }
  }

  getStatusLabel(status: number){
    return this.statusMap[status]?.label ?? 'UnKnown';
  }

  getSeverity(status: number): string{
    return this.statusMap[status]?.severity ?? 'primary';
  }

}
