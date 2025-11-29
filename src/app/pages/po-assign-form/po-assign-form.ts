import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  duration = 0;

  consultancyList: any;
  spnInfoList: any;
  selectedSpn: any = {
    spnId: null
  };
  demandList: any;
  selectedExistingSpn: any;
  newEmployeeList: any;
  existingEmployeeList: any;

  newEmployeeLineItems: any[] = [];
  existingEmployeeLineItems: any[] = [];

  constructor(private apiService: Apiservice, private messageService: MessageService, private router: Router){}

  mapPOForm = this.fb.group({
    poNumber: [0],
    consultancy: this.fb.group({
      userId: [0]
    }),
    poDate: [''],
    validFrom: [''],
    validTo: [''],
    totalValue: [0],
    newEmployeeItems: this.fb.array([]),
    existingEmployeeItems: this.fb.array([])
  })

  get newEmployeeItems(){
    return this.mapPOForm.get('newEmployeeItems') as FormArray;
  }

  get existingEmployeeItems(){
    return this.mapPOForm.get('existingEmployeeItems') as FormArray;
  }

  addLineItems(emp?: any){
    return this.fb.group({
      candidate: this.fb.group({
        candidateId: [emp?.candidateId]
      }),
      monthsAllowed: [0],
      unitRate: [0],
      taxRate: [0],
      taxAmount: [0],
      itemTotal: [0]
    })
  }

  ngOnInit(): void {
    this.fetchConsultancyList();
    this.fetchSpnInfoList();

    const form = this.mapPOForm;

    form.get('validFrom')?.valueChanges.subscribe(() => this.updateDuration());
    form.get('validTo')?.valueChanges.subscribe(() => this.updateDuration());

    this.addNewEmployeeLineItems();
    this.addExistingEmployeeLineItems();
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

  updateDuration(){
    const validFrom = this.mapPOForm.get('validFrom')?.value;
    const validTo = this.mapPOForm.get('validTo')?.value;

    if(validFrom && validTo){
      const start = new Date(validFrom);
      const end = new Date(validTo);

      const years = end.getFullYear() - start.getFullYear();
      const months = end.getMonth() - start.getMonth();

      this.duration = years * 12 + months;
    } else {
      this.duration = 0;
    }
  }

  addNewEmployeeLineItems(){
    const newItem = this.newEmployeeLineItems[0];
    this.newEmployeeLineItems.push(newItem);
    // this.newEmployeeList = [];
    // this.selectedSpnId = 0;
    // this.selectedSpn = [];
  } 

  addExistingEmployeeLineItems(){
    const newItem = this.existingEmployeeLineItems[0];
    this.existingEmployeeLineItems.push(newItem);
  }

  subscribeToItemChanges(item: FormGroup){
    item.valueChanges.subscribe(val => {
      const months = val.monthsAllowed;
      const unitPrice = val.unitRate;
      const taxRate = val.taxRate;
      console.log(months, unitPrice, taxRate);

      const taxAmount = (unitPrice * (taxRate / 100) + 100);
      const itemTotal = months * taxAmount;
      item.patchValue({
        taxAmount: taxAmount,
        itemTotal: itemTotal
      }, { emitEvent: false })
    })
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

  populateNewEmployeeList(){
    this.newEmployeeItems.clear();

    this.newEmployeeList.forEach((emp: any) => {
      this.newEmployeeItems.push(this.addLineItems(emp));
    });

    this.newEmployeeItems.controls.forEach((item, index) => {
      this.subscribeToItemChanges(item as FormGroup)
    });
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
          const newEmployeeItems = val?.data;

          const selectedConsultancy = this.mapPOForm.get('consultancy.userId')?.value;

          this.newEmployeeList = newEmployeeItems.filter((e: any) => e.consultancyId === selectedConsultancy);
          this.populateNewEmployeeList();

          console.log(this.newEmployeeList);
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

  populateExistingEmployeeList(){
    this.existingEmployeeItems.clear();

    this.existingEmployeeList.forEach((emp: any) => {
      this.existingEmployeeItems.push(this.addLineItems(emp));
    });

    this.existingEmployeeItems.controls.forEach((item, index) => {
      this.subscribeToItemChanges(item as FormGroup)
    });
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
          const existingEmployeeItems = val?.data;

          const selectedConsultancy = this.mapPOForm.get('consultancy.userId')?.value;

          this.existingEmployeeList = existingEmployeeItems.filter((e: any) => e.consultancyId === selectedConsultancy);
          this.populateExistingEmployeeList();
          console.log(this.existingEmployeeList);
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail });
            this.existingEmployeeList = [];
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  removeNewEmployee(index: number){
    this.newEmployeeItems.removeAt(index);
  }

  removeExistingEmployee(index: number){
    console.log(index);
    this.existingEmployeeItems.removeAt(index);
  }

  mapItems(list: any[]){
    return list.map((item: any) => ({
      candidate: {
        candidateId: item.candidate.candidateId
      },
      monthsAllowed: item.monthsAllowed,
      unitRate: item.unitRate,
      taxRate: item.taxRate
    }))
  }

  onSubmit(){
    try {     
      console.log(this.mapPOForm.value);

      const data = {
        poNumber: this.mapPOForm.get('poNumber')?.value,
        consultancy: {
          userId: this.mapPOForm.get('consultancy.userId')?.value
        },
        poDate: this.mapPOForm.get('poDate')?.value,
        validFrom: this.mapPOForm.get('validFrom')?.value,
        validTo: this.mapPOForm.get('validTo')?.value,
        totalValue: this.mapPOForm.get('totalValue')?.value,
        items: [
          ...this.mapItems(this.newEmployeeItems.value),
          ...this.mapItems(this.existingEmployeeItems.value)
        ]
      }

      console.log(data);

      this.apiService.mapNewPurchaseOrder(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Purchase Order Created Successfully'});
          this.router.navigate(['/home/po-assign']);
        },
        error: err => {
          console.log(err);
          
          if (err.status == 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
