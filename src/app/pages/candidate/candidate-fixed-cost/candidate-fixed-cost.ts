import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

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

  constructor(private apiService: Apiservice){}

  ngOnInit(): void {
    this.fetchActiveFixedCostCandidates();
  }

  fetchActiveFixedCostCandidates(){
    const data = {
      offSet: this.offSet,
      pageSize: this.pageSize
    }

    this.apiService.fetchActiveFixedCostCandidates(data).subscribe({
      next: val => {
        console.log(val);
        this.fixedCostCandidateList = val.data.data;
      },
      error: err => {
        console.log(err);
      }, 
      complete: () => console.log('Complete signal')
    })
  }

  fixedCostList = [
    {
      id: 1,
      reqId: 'R001',
      State: 'MH',
      rm: 'Surendra Singh',
      pCode: 'P8001',
      site: 'MH',
      candidateName: 'Sagar',
      positionApplied: 'Store Executive',
      exp: '2',
      totalExp: '6',
      highQualification: 'diploma',
      qualification: 'Electrical',
      noticePeriod: '15 days'
    },
    {
      id: 2,
      reqId: 'R002',
      State: 'KA',
      rm: 'Srikant Shanmugan',
      pCode: 'P8002',
      site: 'KA',
      candidateName: 'Taja Ram',
      positionApplied: 'Electrical Engineer',
      exp: '6',
      totalExp: '9',
      highQualification: 'BE',
      qualification: 'Mechanical',
      noticePeriod: '20 days'
    },
  ]
}
