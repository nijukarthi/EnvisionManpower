import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-candidate-cost-plus',
  imports: [Shared],
  templateUrl: './candidate-cost-plus.html',
  styleUrl: './candidate-cost-plus.scss'
})
export class CandidateCostPlus implements OnInit {
  offSet = 0;
  pageSize = 10;

  costPlusCandidateList: any;

  constructor(private apiService: Apiservice){}

  ngOnInit(): void {
    this.fetchActiveCostPlusCandidates();
  }

  getMenuItems(candidate: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil'
       },
      {
        label: 'Delete',
        icon: 'pi pi-trash'
      }
    ]
  }

  fetchActiveCostPlusCandidates(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      this.apiService.fetchActiveCostPlusCandidates(data).subscribe({
        next: val => {
          console.log(val);
          this.costPlusCandidateList = val?.data?.data;
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
