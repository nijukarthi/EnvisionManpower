import { Shared } from '@/service/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-candidate-fixed-cost',
  imports: [Shared],
  templateUrl: './new-candidate-fixed-cost.html',
  styleUrl: './new-candidate-fixed-cost.scss'
})
export class NewCandidateFixedCost {
  openCandidateFixedCost = false;

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

  addCandidate(){
    try {
      this.openCandidateFixedCost = true;
    } catch (error) {
      console.log(error);
    }
  }
}
