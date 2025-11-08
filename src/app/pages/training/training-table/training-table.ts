import { Shared } from '@/service/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'app-training-table',
  imports: [Shared],
  templateUrl: './training-table.html',
  styleUrl: './training-table.scss'
})
export class TrainingTable {
  trainingList = [
    {
      id: 1,
      employeeCode: 'EMP-C-0005',
      candidateCode: 'SAN010',
      pCode: 'P8001',
      employeeName: 'Sandhya',
      site: 'P8001-KA',
      state: 'Karnataka',
      designation: 'Store Engineer',
      yesOrNo: 'Yes',
      windId: '7001',
      validFrom: '7-11-2015',
      validTill: '12-11-2015'
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
      yesOrNo: 'Yes',
      windId: '7005',
      validFrom: '7-11-2015',
      validTill: '12-11-2015'
    }
  ] 
}
