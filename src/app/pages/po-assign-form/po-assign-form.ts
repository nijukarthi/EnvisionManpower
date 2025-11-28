import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-po-assign-form',
  imports: [Shared],
  templateUrl: './po-assign-form.html',
  styleUrl: './po-assign-form.scss'
})
export class PoAssignForm implements OnInit {
  private fb = inject(FormBuilder);

  selectedSpnId = 0;
  selectedExistingSpnId = 0;

  consultancyList: any;
  spnInfoList: any;
  selectedSpn: any = {
    spnId: null
  };
  demandList: any;
  selectedExistingSpn: any;

  constructor(private apiService: Apiservice, private messageService: MessageService){}

  mapPOForm = this.fb.group({
    poNumber: [0],
    consultancy: this.fb.group({
      userId: [0]
    }),
    poDate: [''],
    validFrom: [''],
    validTo: [''],
    totalValue: [0],
    items: this.fb.array([this.addEmployee()])
  })

  addEmployee(){
    return this.fb.group({
      candidate: this.fb.group({
        candidateId: [0]
      }),
      monthsAllowed: [0],
      unitRate: [0],
      taxRate: [0]
    })
  }

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

  ngOnInit(): void {
    this.fetchConsultancyList();
    this.fetchSpnInfoList();
  }

  fetchConsultancyList(){
    try {
      this.apiService.fetchConsultancyInfoList('').subscribe({
        next: val => {
          console.log(val);
          this.consultancyList = val.data
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchSpnInfoList(){
    try {
      this.apiService.fetchSpnInfo('').subscribe({
        next: val => {
          console.log(val);
          this.spnInfoList = val.data
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  selectedSpnCode(spnId: number){
    console.log(spnId);
    this.selectedSpnId = spnId;
    this.selectedSpn = this.spnInfoList.find((spn: any) => spn.spnId === spnId);
    console.log(this.selectedSpn);

    this.fetchDemandDetails();
  }

  selectedExistingSpnCode(spnId: number){
    this.selectedExistingSpnId = spnId;
    this.selectedExistingSpn = this.spnInfoList.find((spn: any) => spn.spnId === spnId);
    console.log(this.selectedSpn);

    this.fetchSpnCandidates();
  }

  fetchDemandDetails(){
    try {
      const data = {
        spnId: this.selectedSpnId
      }
      console.log(data);

      this.apiService.fetchDemandDetails(data).subscribe({
        next: val => {
          console.log(val);
          this.demandList = val?.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  selectedDemand(demandId: number){
    try {
      const data = {
        demandId: demandId
      }
      console.log(data);

      this.apiService.fetchDemandCandidates(data).subscribe({
        next: val => {
          console.log(val);
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchSpnCandidates(){
    try {
      const data = {
        spnId: this.selectedExistingSpnId
      }

      console.log(data);

      this.apiService.fetchSpnCandidates(data).subscribe({
        next: val => {
          console.log(val);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    console.log(this.mapPOForm.value);
  }
}
