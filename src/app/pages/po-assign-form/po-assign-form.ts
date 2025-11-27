import { Shared } from '@/service/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'app-po-assign-form',
  imports: [Shared],
  templateUrl: './po-assign-form.html',
  styleUrl: './po-assign-form.scss'
})
export class PoAssignForm {
  demandCodeList = [
    {
      label: 'R2211001-1',
      value: 1
    },
    {
      label: 'R2211001-2',
      value: 2
    },
    {
      label: 'R2211002-1',
      value: 3
    },
    {
      label: 'R2211002-2',
      value: 4
    }
  ]

  consultancyList = [
    {
      label: 'Key Resource Manpower Consultancy',
      value: 1
    },
    {
      label: 'Talent Path Solutions',
      value: 2
    },
    {
      label: 'Cloute Technologies Private Limited',
      value: 3
    },
    {
      label: 'Eco Green Technology',
      value: 4
    }
  ]

  newEmployeeList = [
    {
      id: 1,
      employeeCode: 'EC-0005',
      employeeName: 'Praveen',
      duration: 5,
      unitPrice: 1000,
      taxRate: 4000,
      amount: 10000,
      totalValue: 50000
    },
    {
      id: 2,
      employeeCode: 'EC-0006',
      employeeName: 'Kayal',
      duration: 6,
      unitPrice: 2000,
      taxRate: 4000,
      amount: 15000,
      totalValue: 550000
    }
  ]

    existingEmployeeList = [
    {
      id: 1,
      employeeCode: 'EC-0007',
      employeeName: 'Kumar',
      duration: 5,
      unitPrice: 1000,
      taxRate: 4000,
      amount: 10000,
      totalValue: 50000
    },
    {
      id: 2,
      employeeCode: 'EC-0008',
      employeeName: 'Sandhya',
      duration: 6,
      unitPrice: 2000,
      taxRate: 4000,
      amount: 15000,
      totalValue: 550000
    }
  ]
}
