import { DemandStatus } from '@/models/demand-status/demand-status.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
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

  demandFullfillmentList: any;
  requisitionDetails: any;

  openViewRequisition = false;

  constructor(private apiService: Apiservice, private router: Router){}

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
          this.demandFullfillmentList = val.data.data;
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
    this.offSet = event.first;
    this.pageSize = event.rows;
    this.fetchDemandFullfillment();
  }
}
