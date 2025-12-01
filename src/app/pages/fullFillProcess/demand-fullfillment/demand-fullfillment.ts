import { STEP_ACCESS } from '@/constants/step-access.config';
import { DemandStatus } from '@/models/demand-status/demand-status.enum';
import { FullFillmentStatus } from '@/models/fullfillment-status/fullfillment-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { StepStateService } from '@/service/step-service/step-state.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-resource-manager',
  imports: [Shared],
  templateUrl: './demand-fullfillment.html',
  styleUrl: './demand-fullfillment.scss'
})
export class DemandFullfillment implements OnInit {
  offSet = 0;
  pageSize = 10;
  first = 0;
  demandFullfillmentListLength = 0;

  demandFullfillmentList: any;
  requisitionDetails: any;

  openViewRequisition = false;

  UserGroups = UserGroups;

  currentUserRole = Number(sessionStorage.getItem('userGroupId'));

  constructor(private apiService: Apiservice, private router: Router, private stepService: StepStateService,
      private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.fetchDemandFullfillment();
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
          this.router.navigate(['/home/demand-fullfillment/steps'], 
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
    console.log(stepName);

    const allowedRoles = STEP_ACCESS[stepName];

    if (!allowedRoles.includes(this.currentUserRole)) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'You are not allowed to access this step.'});
      return;
    }
    this.stepService.setActiveStep(stepName);
    this.router.navigate(['/home/demand-fullfillment/steps'],
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

  fetchDemandFullfillment(){
    try {
      const data = {
        demandStatus: DemandStatus.PROCESSING,
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      this.apiService.fetchDemandFullFill(data).subscribe({
        next: val => {
          console.log(val);
          this.demandFullfillmentList = val?.data?.data;
          this.demandFullfillmentListLength = val.data.length;
        },
        error: err => {
          console.log(err);
        }
      })
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

  pageChange(event: any){
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    this.fetchDemandFullfillment();
  }
}
