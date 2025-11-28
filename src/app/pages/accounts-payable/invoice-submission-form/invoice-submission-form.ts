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
      employeeCode: 'EC-0001',
      employeeName: 'Praveen',
      spnCode: 'SPN328377',
      spnDescription: 'Projects QEHS Engineer',
      experience: '5-8 years',
      sacCode: '-',
      siteName: 'Karnataka',
      unitPrice: '20000',
      present: '26',
      weekOff: '4',
      paidLeave: '1',
      unpaidLeave: '0',
      daysWorked: '26',
      totalNet: '30000'
    },
    {
      id: 2,
      employeeCode: 'EC-0002',
      employeeName: 'Guru',
      spnCode: 'SPN328356',
      spnDescription: 'Projects QEHS Engineer',
      experience: '3-5 years',
      sacCode: '-',
      siteName: 'Karnataka',
      unitPrice: '30000',
      present: '26',
      weekOff: '4',
      paidLeave: '1',
      unpaidLeave: '0',
      daysWorked: '26',
      totalNet: '40000'
    },
    {
      id: 3,
      employeeCode: 'EC-0003',
      employeeName: 'Shivam',
      spnCode: 'SPN328322',
      spnDescription: 'Projects Civil Manager',
      experience: '8-10 years',
      sacCode: '-',
      siteName: 'Karnataka',
      unitPrice: '20000',
      present: '27',
      weekOff: '4',
      paidLeave: '0',
      unpaidLeave: '0',
      daysWorked: '27',
      totalNet: '30000'
    },
  ]
}
