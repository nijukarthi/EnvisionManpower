import { Shared } from '@/service/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'app-terminate',
  imports: [Shared],
  templateUrl: './terminate.html',
  styleUrl: './terminate.scss'
})
export class Terminate {
  terminateList = [
    {
      id: 1,
      employeeCode: 'EMP-C-0005',
      employeeName: 'Sandhya',
      pCode: 'P8001',
      site: 'P8001-KA',
      state: 'Karnataka',
      designation: 'Electrical Technician',
      cApproval: 'Pending',
      dApproval: 'Pending'
    },
    {
      id: 2,
      employeeCode: 'EMP-C-0006',
      employeeName: 'Suman',
      pCode: 'P8007',
      site: 'P8007-KA',
      state: 'Karnataka',
      designation: 'Electrical Technician',
      cApproval: 'Pending',
      dApproval: 'Pending'
    }
  ]
}
