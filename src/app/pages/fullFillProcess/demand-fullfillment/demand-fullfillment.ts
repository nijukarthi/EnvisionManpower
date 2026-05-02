import { STEP_ACCESS } from '@/constants/step-access.config';
import { DemandStatus } from '@/models/demand-status/demand-status.enum';
import { FullFillmentStatus } from '@/models/fullfillment-status/fullfillment-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { StepStateService } from '@/service/step-service/step-state.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-resource-manager',
  imports: [Shared],
  templateUrl: './demand-fullfillment.html',
  styleUrl: './demand-fullfillment.scss'
})
export class DemandFullfillment implements OnInit {
  @ViewChild('dt') dt: any;
  
  offSet = 0;
  pageSize = 10;
  first = 0;
  totalRecords = 0;

  demandFullfillmentList: any;
  requisitionDetails: any;
  filteredData: any;

  statuses: any[] = [];

  openViewRequisition = false;

  UserGroups = UserGroups;

  currentUserRole = Number(sessionStorage.getItem('userGroupId'));

  filters = {
    status: [{ value: [102], matchMode: 'equals' }]
  };

  selectedStatuses: number[] = [102];

  statusMap: any = {
    102: { label: 'Processing', severity: 'warn' },
    200: { label: 'Completed', severity: 'primary' },
    406: { label: 'Rejected', severity: 'danger' }
  }

  constructor(private apiService: Apiservice, private router: Router, private stepService: StepStateService,
      private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.fetchDemandFullfillment();

    this.statuses = [
      { label: 'Processing', value: 102 },
      { label: 'Completed', value: 200 },
      { label: 'Rejected', value: 406 }
    ];
  }


  getMenuItems(demand: any){
    const stepName = Number(this.getStepLabel(demand.fullfillmentStatus));

    return [
      {
        label: 'View Requisition',
        icon: 'pi pi-eye',
        command: () => this.viewRequisition(demand)
      },
      {
        label: 'View Steps',
        icon: 'pi pi-eye',
        command: () => { 
          this.stepService.setActiveStep(stepName);
          this.router.navigate(['/home/manpower-fulfillment/steps'], 
          {
            state: {
              requesitionId: demand.requesitionId,
              demandId: demand.demandId,
              fullfillmentStatus: demand.fullfillmentStatus,
              categoryId: demand.requesitionDetails?.category?.categoryId
            }
          })
        }
      }
    ]
  }

  getStepLabel(status: number): string {
    switch(status){
      case FullFillmentStatus.STEP1:
        return '1'
      case FullFillmentStatus.STEP2:
        return '2'
      case FullFillmentStatus.STEP3:
        return '3'
      case FullFillmentStatus.STEP4:
        return '4'
      case FullFillmentStatus.STEP5:
        return '5'
      case FullFillmentStatus.STEP6:
        return "6"
      case FullFillmentStatus.STEP7:
        return '7'
      default:
        return '-'
    }
  }

  goToStep(demand: any){
    const stepName = Number(this.getStepLabel(demand.fullfillmentStatus));

    const allowedRoles = STEP_ACCESS[stepName];

    if (!allowedRoles.includes(this.currentUserRole)) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'You are not allowed to access this step.'});
      return;
    }
    this.stepService.setActiveStep(stepName);
    this.router.navigate(['/home/manpower-fulfillment/steps'],
      {
        state: {
          requesitionId: demand.requesitionId,
          demandId: demand.demandId,
          fullfillmentStatus: demand.fullfillmentStatus,
          categoryId: demand.requesitionDetails?.category?.categoryId
        }
      }
    );
  }

  canAccessStep(stepNumber: string){
    const allowedRoles = STEP_ACCESS[Number(stepNumber)];
    return allowedRoles.includes(this.currentUserRole) || false;
  }

  manpowerFulfillmentApi(data: any){
    try {
      this.apiService.fetchDemandFullFill(data).subscribe({
        next: val => {
          this.demandFullfillmentList = val?.data?.data;
          this.totalRecords = val.data.length ?? 0;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchDemandFullfillment(){
    try {
      const data = {
        demandStatus: DemandStatus.PROCESSING,
        offSet: this.offSet,
        pageSize: this.pageSize
      }
      
      this.manpowerFulfillmentApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  viewRequisition(demand: any){
    try {
      this.openViewRequisition = true;
      this.requisitionDetails = demand?.requesitionDetails;
    } catch (error) {
      console.log(error);
    }
  }

  getStatusLabel(status: number){
    return this.statusMap[status].label ?? 'Unknown';
  }

  getSeverity(status: number){
    return this.statusMap[status].severity ?? 'primary';
  }
  

  pageChange(event: any){
    this.fetchDemandFullfillment();
  }

  loadFulfillment(event: any){
    try {
      this.first = event.first;
      this.offSet = event.first / event.rows;
      this.pageSize = event.rows;
  
      const filters = event.filters;
  
      this.filteredData = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        demandCode: filters?.demandCode?.[0]?.value ?? '',
        demandStatus: filters?.status?.[0]?.value ?? [102],
        spnCode: filters?.spnCode?.[0]?.value ?? '',
        spnDescription: filters?.spnDescription?.[0].value ?? '',
        experience: filters?.experience?.[0].value ?? '',
        envisionRoleName: filters?.roleName?.[0].value ?? '',
      }
  
      this.manpowerFulfillmentApi(this.filteredData);
    } catch (error) {
      console.log(error);
    }
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
