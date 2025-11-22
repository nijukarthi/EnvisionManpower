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
}
