import { Component, OnInit, ViewChild } from '@angular/core';
import { Shared } from '@/service/shared';
import { FormBuilder } from '@angular/forms';
import { Apiservice } from '@/service/apiservice/apiservice';
import { DemandStatus } from '@/models/demand-status/demand-status.enum';
import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  filteredData: any;

  statuses: any[] = [];

  USERGROUPS = UserGroups;
  DEMANDSTATUS = DemandStatus;
  APPROVALSTATUS = ApprovalStatus;
  
  loggedUserGroupId = Number(sessionStorage.getItem('userGroupId'));

  currentUserEmail = sessionStorage.getItem('userEmail');

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
    status: [{ value: [102], matchMode: 'in' }]
  };

  selectedStatuses: number[] = [102];

  constructor(private fb: FormBuilder, private apiService: Apiservice, private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

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
          this.demandProcessingList = val?.data?.data.map((item: any) => {
            const deploymentDate = item.plannedDeploymentDate
              ? new Date(item.plannedDeploymentDate + 'T00:00:00')
              : null;

            const releaseDate = item.plannedReleaseDate
              ? new Date(item.plannedReleaseDate + 'T00:00:00')
              : null;

            const today = new Date();
            const deployMin = new Date(today);
            deployMin.setDate(deployMin.getDate() + 30);

            let releaseMin = null;
            if (deploymentDate) {
              releaseMin = new Date(deploymentDate);
              releaseMin.setDate(releaseMin.getDate() + 7);
            }

            return {
              ...item,
              plannedDeploymentDate: deploymentDate,
              plannedReleaseDate: releaseDate,
              deployMinDate: deploymentDate && deploymentDate < deployMin ? deploymentDate : deployMin,
              releaseMinDate: releaseMin
            };
          });
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
  
      this.manpowerApprovalApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  demandQtyChange(demandId: number, quantity: number){
    try {    
      const data = {
        demandId: demandId,
        quantity: quantity
      }
  
      this.apiService.editDemandQuantity(data).subscribe({
        next: val => {
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
      const data = {
        demandId: demandId,
        approvalStatus: type === 'Accepted' ? 200 : 406
      }

      this.apiService.approveDemandByClusterHead(data).subscribe({
        next: val => {
          this.messageService.add({severity: 'success', summary: 'Success', 
            detail: type === 'Accepted' ? 'Manpower Successfully Accepted' : 'Manpower Rejected' });
          this.manpowerApprovalApi(this.filteredData);
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
      const data = {
        demandId: demandId,
        approvalStatus: type === 'Accepted' ? 200 : 406
      }

      this.apiService.approveDemandByDepartmentHead(data).subscribe({
        next: val => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: type === 'Accepted' ? 
            'Manpower Successfully Accepted' : 'Manpower Rejected'});
          this.manpowerApprovalApi(this.filteredData);
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

  exportToExcel(){
    const emailText = this.currentUserEmail ?? 'your email address';

    this.confirmationService.confirm({
      message: `The Excel file will be sent to ${emailText}. Do you want to proceed?`,
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true
      },
      acceptButtonProps: {
          label: 'OK'
      },
      accept: () => {
        try {
          const data = {
            ...this.filteredData,
            export: true
          }

          this.apiService.fetchDemandRequest(data).subscribe({
            next: val => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Excel file successfully send to email' });
            },
            error: err => {
              console.log(err);
            }
          })
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  updatePlannedDate(demandId: number){
    try {
      const demand = this.demandProcessingList.find((d: any) => d.demandId === demandId);

      if(!demand) return;

      const data = {
        demandId: demandId,
        plannedDeploymentDate: this.formatDate(demand.plannedDeploymentDate),
        plannedReleaseDate: this.formatDate(demand.plannedReleaseDate)
      }

      console.log(data);

      this.apiService.updatePlannedDate(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Updated Planned Date' });
        }, error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
          }
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
  
      this.filteredData = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        demandStatus: filters?.status?.[0]?.value ?? [102],
        demandCode: filters?.demandCode?.[0]?.value ?? '',
        spnCode: filters?.spnCode?.[0]?.value ?? '',
        spnDescription: filters?.spnDescription?.[0].value ?? '',
        experience: filters?.experience?.[0].value ?? '',
        envisionRoleName: filters?.role?.[0].value ?? ''
      };

      console.log(this.filteredData);

      this.manpowerApprovalApi(this.filteredData);
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

  selectedDeploymentDate(demand: any, date: Date) {
    const releaseStart = new Date(date);
    releaseStart.setDate(releaseStart.getDate() + 7);

    demand.releaseMinDate = releaseStart;

    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Release date must be at least 7 days after planned deployment date. Kindly select the release date as well.'
    });
  }

  selectedReleaseDate(demandId: number){
    this.updatePlannedDate(demandId);
  }

  formatDate(date: Date | null): string | null {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  removeStatus(status: number, event?: Event) {
    event?.stopPropagation();

    this.selectedStatuses = this.selectedStatuses.filter(s => s !== status);

    if (!this.selectedStatuses.length) {
      this.selectedStatuses = [102];
    }

    this.dt.filters['status'] = [{
      value: this.selectedStatuses,
      matchMode: 'in'
    }];

    this.dt._filter();
  }

  clearStatusFilters() {
    this.selectedStatuses = [102];
    this.dt.clear();
  }
}
