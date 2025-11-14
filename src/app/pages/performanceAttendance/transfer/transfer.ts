import { Shared } from '@/service/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'app-transfer',
  imports: [Shared],
  templateUrl: './transfer.html',
  styleUrl: './transfer.scss'
})
export class Transfer {
  transferList = [
    {
      id: 1,
      employeeCode: 'EMP-C-0005',
      pCode: 'P8001',
      employeeName: 'Sandhya',
      site: 'P8001-KA',
      state: 'Karnataka',
      designation: 'QA/QC Engineer',
      tPCode: 'P8007',
      tSite: 'P8007-TN',
      tState: 'Tamil Nadu',
      tDesignation: 'Electrical Technician',
      cApproval: 'Pending',
      dApproval: 'Pending'
    },
    {
      id: 2,
      employeeCode: 'EMP-C-0007',
      candidateCode: 'SUM012',
      pCode: 'P8002',
      employeeName: 'Suman',
      site: 'P8001-TN',
      state: 'Tamil Nadu',
      designation: 'QA/QC Engineer',
      tPCode: 'P8009',
      tSite: 'P8009-KA',
      tState: 'Karnataka',
      tDesignation: 'Electrical Technician',
      cApproval: 'Pending',
      dApproval: 'Pending'
    }
  ] 
}
