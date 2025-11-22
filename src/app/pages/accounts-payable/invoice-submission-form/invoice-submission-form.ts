import { Shared } from '@/service/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-submission-form',
  imports: [Shared],
  templateUrl: './invoice-submission-form.html',
  styleUrl: './invoice-submission-form.scss'
})
export class InvoiceSubmissionForm {
  isPoCopyAttached = [
    {
      label: 'Yes',
      value: true
    },
    {
      label: 'No',
      value: false
    }
  ]

  poDemandList = [
    {
      id: 1,
      demandCode: 'R2111004-1',
      employeeCode: 'EC-0001',
      spnCode: 'SPN328377',
      spnDescription: 'Projects QEHS Engineer',
      experience: '5-8 years',
      pdd: '10-11-2025',
      prd: '22-11-2025',
      unitPrice: '20000',
      totalNet: '30000'
    },
    {
      id: 2,
      demandCode: 'R2111004-2',
      employeeCode: 'EC-0002',
      spnCode: 'SPN328356',
      spnDescription: 'Projects QEHS Engineer',
      experience: '3-5 years',
      pdd: '12-11-2025',
      prd: '21-11-2025',
      unitPrice: '30000',
      totalNet: '40000'
    },
    {
      id: 3,
      demandCode: 'R2111005-1',
      employeeCode: 'EC-0003',
      spnCode: 'SPN328322',
      spnDescription: 'Projects Civil Manager',
      experience: '8-10 years',
      pdd: '14-11-2025',
      prd: '23-11-2025',
      unitPrice: '20000',
      totalNet: '30000'
    },
  ]
}
