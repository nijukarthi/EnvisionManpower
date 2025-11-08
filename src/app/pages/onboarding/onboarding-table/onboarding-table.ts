import { Shared } from '@/service/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'app-onboarding-table',
  imports: [Shared],
  templateUrl: './onboarding-table.html',
  styleUrl: './onboarding-table.scss'
})
export class OnboardingTable {
  onboardingList = [
    {
      id: 1,
      employeeCode: 'EMP-C-0005',
      candidateCode: 'SAN010',
      pCode: 'P8001',
      employeeName: 'Sandhya',
      site: 'P8001-KA',
      state: 'Karnataka',
      designation: 'Store Engineer',
      expectedDoj: '17-11-2025',
      actualDoj: '20-11-2025',
      contact: '9498490284',
      eContact: '9929067283',
      uan: '125474839990',
      aadharNo: '637282819087',
      ppeType: 'Safety Helmet'
    },
    {
      id: 2,
      employeeCode: 'EMP-C-0007',
      candidateCode: 'SUM012',
      pCode: 'P8002',
      employeeName: 'Suman',
      site: 'P8001-TN',
      state: 'Tamil Nadu',
      designation: 'Store Engineer',
      expectedDoj: '12-11-2025',
      actualDoj: '20-11-2025',
      contact: '9498000284',
      eContact: '9929077283',
      uan: '125470039990',
      aadharNo: '637282119087',
      ppeType: 'Gloves'
    }
  ] 
}
