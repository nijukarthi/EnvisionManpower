import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-candidate-fixed-cost',
  imports: [Shared],
  templateUrl: './candidate-fixed-cost.html',
  styleUrl: './candidate-fixed-cost.scss'
})
export class CandidateFixedCost implements OnInit {
  offSet = 0;
  pageSize = 10;

  fixedCostCandidateList: any;

  constructor(private apiService: Apiservice, private router: Router){}

  ngOnInit(): void {
    this.fetchActiveFixedCostCandidates();
  }

  getMenuItems(candidate: any){
     return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.router.navigate(['/home/candidates/fixed-cost', candidate.candidateId])
       },
      {
        label: 'Delete',
        icon: 'pi pi-trash'
      }
    ]
  }

  fetchActiveFixedCostCandidates(){
    const data = {
      offSet: this.offSet,
      pageSize: this.pageSize
    }

    this.apiService.fetchActiveFixedCostCandidates(data).subscribe({
      next: val => {
        console.log(val);
        this.fixedCostCandidateList = val?.data?.data;
      },
      error: err => {
        console.log(err);
      }, 
      complete: () => console.log('Complete signal')
    })
  }
}
