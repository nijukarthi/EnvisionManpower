import { DemandStatus } from '@/models/demand-status/demand-status.enum';
import { FullFillmentStatus } from '@/models/fullfillment-status/fullfillment-status.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { StepStateService } from '@/service/step-service/step-state.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private apiService: Apiservice, private router: Router, private stepService: StepStateService){}

  ngOnInit(): void {
    this.fetchDemandFullfillment();
  }

  getMenuItems(demand: any){
    return [
      {
        label: 'View Requisition',
        icon: 'pi pi-eye',
        command: () => this.viewRequisition(demand)
      },
      {
        label: 'View Steps',
        icon: 'pi pi-eye',
        command: () => this.router.navigate(['/home/demand-fullfillment/steps'], 
          {
            state: {
              requesitionId: demand.requesitionId,
              demandId: demand.demandId,
              fullfillmentStatus: demand.fullfillmentStatus
            }
          }
        )
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

  goToStep(status: number){
    console.log(status);
    const stepName = Number(this.getStepLabel(status));
    console.log(stepName);
    this.stepService.setActiveStep(stepName);
    this.router.navigate(['/home/demand-fullfillment/steps']);
  }

  fetchDemandFullfillment(){
    try {
      const data = {
        demandStatus: DemandStatus.PROCESSING,
        isEnvisionRoleAssigned: true,
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
      const data = {
        requesitionId: demand.requesitionId
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

  pageChange(event: any){
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    this.fetchDemandFullfillment();
  }
}
