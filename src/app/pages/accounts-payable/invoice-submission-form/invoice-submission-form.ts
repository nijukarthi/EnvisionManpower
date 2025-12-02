import { PurchaseOrderStatus } from '@/models/purchase-order-status/purchase-order-status.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-invoice-submission-form',
  imports: [Shared],
  templateUrl: './invoice-submission-form.html',
  styleUrl: './invoice-submission-form.scss'
})
export class InvoiceSubmissionForm implements OnInit {
  offSet = 0;
  pageSize = 100;
  poId = 0;

  poList: any;
  poDetails: any;
  poEmployeeList: any;

  selectedEmployees: number[] = [];

  private fb = inject(FormBuilder);

  constructor(private apiService: Apiservice, private messageService: MessageService, private router: Router){}

  invoiceForm = this.fb.group({
    invoiceNumber: [0],
    poId: [0],
    year: [null as Date | null],
    sealAndSignDate: [''],
    isPoCopyAttached: [false],
    invoiceDate: [''],
    pod: [''],
    submittedOn: [''],
    month: [null as Date | null],
    submittedTo: [''],
    items: this.fb.array([])
  })

  get items(){
    return this.invoiceForm.get('items') as FormArray;
  }

  poEmployeeDetails(emp: any){
    return this.fb.group({
      employmentId: [emp.employmentDetails.employmentId],
      sacCode: ['']
    })
  }

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

  ngOnInit(): void {
    this.fetchPOList();
  }

  fetchPOList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        poStatus: PurchaseOrderStatus.ACTIVE
      }

      console.log(data);

      this.apiService.fetchPOList(data).subscribe({
        next: val => {
          console.log(val);
          this.poList = val.data.data.map((po: any) => {
            const start = new Date(po.validFrom);
            const end = new Date(po.validTo);

            const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - end.getMonth());

            return {
              ...po,
              duration: months
            }
          });
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  convertMonthAndYear(){
    const selectedMonth = this.invoiceForm.get('month')?.value;
    if (!selectedMonth) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: "Month not selected"});
      return;
    }
    const month = selectedMonth.getMonth() + 1;

    const selectedYear = this.invoiceForm.get('year')?.value;
    if (!selectedYear) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: "Year not selected"});
      return;
    }
    const year = selectedYear.getFullYear();

    return { month, year };
  }


  selectedPOId(poId: number){
    try {
      console.log(poId);
      this.poId = poId;
      this.poDetails = this.poList.find((po: any) => po.poId === poId);
      console.log(this.poDetails);

      const monthYear = this.convertMonthAndYear();

      const data = {
        poId: poId,
        month: monthYear?.month,
        year: monthYear?.year
      }

      console.log(data);

      this.apiService.fetchPODetails(data).subscribe({
        next: val => {
          console.log(val);
          this.poEmployeeList = val?.data;
          this.items.clear();
          this.poEmployeeList.forEach((emp: any) => {
            this.items.push(this.poEmployeeDetails(emp));
          });
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  selectedPOEmployee(emp: any){
    const id = emp.employmentDetails?.employmentId;

    if (!this.selectedEmployees.includes(id)) {
      this.selectedEmployees.push(id);
    }
    console.log("Selected:", this.selectedEmployees);
    console.log(this.invoiceForm.value);
  }

  unSelectedEmployee(emp: any){
    const id = emp.employmentDetails?.employmentId;
    this.selectedEmployees = this.selectedEmployees.filter(e => e !== id);
    console.log("Selected:", this.selectedEmployees);

    console.log(this.items.value);
    console.log(this.invoiceForm.value);
  }

  formatDate(date: Date | null | string | undefined): string | null{
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onSubmit(){
    try {
      console.log(this.invoiceForm.value);

      const formValue = this.invoiceForm.value;

      const monthYear = this.convertMonthAndYear();

      const filteredItems = formValue.items?.filter((item: any) => this.selectedEmployees.includes(item.employmentId))

      const data = {
        ...formValue,
        sealAndSignDate: this.formatDate(formValue.sealAndSignDate),
        invoiceDate: this.formatDate(formValue.invoiceDate),
        submittedOn: this.formatDate(formValue.submittedOn),
        month: monthYear?.month,
        year: monthYear?.year,
        items: filteredItems,
        poId: this.poId
      }

      console.log(data);

      this.apiService.createInvoice(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Invoice Created Sucessfully'});

          setTimeout(() => {
            this.router.navigate(['/home/invoice-submission']);
          }, 2000);
        }, error: err => {
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
}
