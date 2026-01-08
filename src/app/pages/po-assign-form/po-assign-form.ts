import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormFieldError } from '@/directives/form-field-error';

@Component({
    selector: 'app-po-assign-form',
    imports: [Shared, FormFieldError],
    templateUrl: './po-assign-form.html',
    styleUrl: './po-assign-form.scss'
})
export class PoAssignForm implements OnInit {
    //private fb = inject(FormBuilder);

    selectedSpnId = 0;
    selectedExistingSpnId = 0;
    duration = 0;

    minPODate: Date | undefined;
    minPOStartDate: Date | undefined;

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
    mapPOForm!: FormGroup;
    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.mapPOForm = this.fb.group({
            poNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
            consultancy: this.fb.group({
                userId: ['', Validators.required]
            }),
            poDate: ['', Validators.required],
            validFrom: ['', Validators.required],
            validTo: ['', Validators.required],
            totalValue: [{ value: 0, disabled: true }],
            newEmployeeItems: this.fb.array([]),
            existingEmployeeItems: this.fb.array([])
        });
    }
    get userId() {
        return this.mapPOForm.get('consultancy.userId');
    }
    get poNumber() {
        return this.mapPOForm.get('poNumber');
    }
    get poDate() {
        return this.mapPOForm.get('poDate');
    }
    get validFrom() {
        return this.mapPOForm.get('validFrom');
    }
    get validTo() {
        return this.mapPOForm.get('validTo');
    }
    get newEmployeeItems() {
        return this.mapPOForm.get('newEmployeeItems') as FormArray;
    }

    get existingEmployeeItems() {
        return this.mapPOForm.get('existingEmployeeItems') as FormArray;
    }

    addLineItems(emp?: any) {
        return this.fb.group({
            candidate: this.fb.group({
                candidateId: [emp?.candidateId]
            }),
            monthsAllowed: [0],
            unitRate: [0],
            taxRate: [0],
            taxAmount: [0],
            itemTotal: [0]
        });
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

    fetchConsultancyList() {
        try {
            this.apiService.fetchConsultancyInfoList('').subscribe({
                next: (val) => {
                    console.log(val);
                    this.consultancyList = val.data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    selectedPODate(poDate: Date){
        console.log(poDate);
        this.minPODate = poDate;
    }

    selectedPOStartDate(poStartDate: Date){
        console.log(poStartDate);
        this.minPOStartDate = poStartDate;
    }

    updateDuration() {
        const validFrom = this.mapPOForm.get('validFrom')?.value;
        const validTo = this.mapPOForm.get('validTo')?.value;

        if (validFrom && validTo) {
            const start = new Date(validFrom);
            const end = new Date(validTo);

            const years = end.getFullYear() - start.getFullYear();
            const months = end.getMonth() - start.getMonth();

            this.duration = years * 12 + months;
        } else {
            this.duration = 0;
        }
    }
    createEmptyLineItem(): FormGroup {
        return this.fb.group({
            selectedSpnId: null,
            selectedSpn: null,
            demandId: null,
            experience: null,
            newEmployeeList: [], // just raw data, not a form control
            newEmployeeItems: this.fb.array([]) // proper FormArray
        });
    }
    addNewEmployeeLineItems() {
        this.newEmployeeLineItems.push(this.createEmptyLineItem());
    }

    createExistingEmptyLineItem(): FormGroup {
        return this.fb.group({
            selectedExistingSpnId: null,
            selectedExistingSpn: null,
            existingEmployeeList: [],
            existingEmployeeItems: this.fb.array([])
        });
    }

    addExistingEmployeeLineItems() {
        this.existingEmployeeLineItems.push(this.createExistingEmptyLineItem());
    }

    subscribeToItemChanges(item: FormGroup) {
        item.valueChanges.subscribe((val) => {
            const months = val.monthsAllowed;
            const unitPrice = val.unitRate;
            const taxRate = val.taxRate;
            console.log(months, unitPrice, taxRate);

            const taxAmount = unitPrice * (taxRate / 100) + unitPrice;
            const itemTotal = months * taxAmount;

            item.patchValue(
                {
                    taxAmount: taxAmount,
                    itemTotal: itemTotal
                },
                { emitEvent: false }
            );

            this.calculateGrandTotal();
            console.log(item);
        });
    }

    calculateGrandTotal() {
        let newTotal = 0;
        let existingTotal = 0;

        this.newEmployeeLineItems.forEach((line) => {
            if (line.newEmployeeItems) {
                line.newEmployeeItems.controls.forEach((ctrl: any) => {
                    newTotal += ctrl.get('itemTotal').value || 0;
                });
            }
        });

        this.existingEmployeeLineItems.forEach((line) => {
            if (line.existingEmployeeItems) {
                line.existingEmployeeItems.controls.forEach((ctrl: any) => {
                    existingTotal += ctrl.get('itemTotal').value || 0;
                });
            }
        });

        const grandTotal = newTotal + existingTotal;
        console.log('Grand Total = ', grandTotal);

        this.mapPOForm.patchValue(
            {
                totalValue: grandTotal.toFixed(2)
            },
            { emitEvent: false }
        );
    }

    fetchSpnInfoList() {
        try {
            this.apiService.fetchSpnInfo('').subscribe({
                next: (val) => {
                    console.log(val);
                    this.spnInfoList = val.data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    selectedSpnCode(spnId: number, item: any) {
        console.log(spnId);
        this.selectedSpnId = spnId;
        item.selectedSpnId = spnId;
        item.selectedSpn = this.spnInfoList.find((spn: any) => spn.spnId === spnId);
        console.log(this.selectedSpn);

        this.fetchDemandDetails();
    }

    selectedExistingSpnCode(spnId: number, lineIndex: number, item: any) {
        this.selectedExistingSpnId = spnId;
        item.selectedExistingSpnId = spnId;
        item.selectedExistingSpn = this.spnInfoList.find((spn: any) => spn.spnId === spnId);
        console.log(this.selectedSpn);

        this.fetchSpnCandidates(lineIndex);
    }

    fetchDemandDetails() {
        try {
            const data = {
                spnId: this.selectedSpnId
            };
            console.log(data);

            this.apiService.fetchDemandDetails(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.demandList = val?.data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    populateNewEmployeeList(lineItem: any) {
        /* this.newEmployeeItems.clear();
    this.newEmployeeList.forEach((emp: any) => {
      this.newEmployeeItems.push(this.addLineItems(emp));
    });

    this.newEmployeeItems.controls.forEach((item, index) => {
      this.subscribeToItemChanges(item as FormGroup)
    }); */
        if (!lineItem.newEmployeeList) return;

        lineItem.newEmployeeItems.clear();

        lineItem.newEmployeeList.forEach((emp: any) => {
            lineItem.newEmployeeItems.push(this.addLineItems(emp));
        });
    }

    selectedDemand(demandId: number, lineIndex: number) {
        try {
            /*   const data = {
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
            this.newEmployeeList = [];
          }
        }
      }) */
            const lineItem = this.newEmployeeLineItems[lineIndex];

            this.apiService.fetchDemandCandidates({ demandId }).subscribe({
                next: (val) => {
                    console.log(val);
                    const employees = val.data;
                    const consultancyId = this.mapPOForm.get('consultancy.userId')?.value;

                    // Store inside THIS line item only
                    lineItem.newEmployeeList = employees.filter((e: any) => e.consultancyId === consultancyId);

                    if (lineItem.newEmployeeList.length === 0) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Employee Found' });
                        return;
                    }

                    // Create a NEW formArray for this line
                    lineItem.newEmployeeItems = this.fb.array([]);

                    // Populate controls
                    lineItem.newEmployeeList.forEach((emp: any) => {
                        lineItem.newEmployeeItems.push(this.addLineItems(emp));
                    });

                    lineItem.newEmployeeItems.controls.forEach((item: any, index: number) => {
                        this.subscribeToItemChanges(item as FormGroup);
                    });

                    console.log('LINE ITEM employees:', lineItem.newEmployeeList);
                },

                error: (err) => {
                    console.log(err);
                    lineItem.newEmployeeList = [];
                    lineItem.newEmployeeItems = this.fb.array([]);

                    if (err.status === 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // populateExistingEmployeeList(){
    //   this.existingEmployeeItems.clear();

    //   this.existingEmployeeList.forEach((emp: any) => {
    //     this.existingEmployeeItems.push(this.addLineItems(emp));
    //   });

    //   this.existingEmployeeItems.controls.forEach((item, index) => {
    //     this.subscribeToItemChanges(item as FormGroup)
    //   });
    // }

    fetchSpnCandidates(lineIndex: number) {
        try {
            const data = {
                spnId: this.selectedExistingSpnId
            };

            console.log(data);

            const lineItem = this.existingEmployeeLineItems[lineIndex];

            this.apiService.fetchSpnCandidates(data).subscribe({
                next: (val) => {
                    console.log(val);
                    const existingEmployeeItems = val?.data;

                    const selectedConsultancy = this.mapPOForm.get('consultancy.userId')?.value;

                    lineItem.existingEmployeeList = existingEmployeeItems.filter((e: any) => e.consultancyId === selectedConsultancy);

                    if (lineItem.existingEmployeeList.length === 0) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Employee Found' });
                        return;
                    }

                    lineItem.existingEmployeeItems = this.fb.array([]);

                    lineItem.existingEmployeeList.forEach((emp: any) => {
                        lineItem.existingEmployeeItems.push(this.addLineItems(emp));
                    });

                    lineItem.existingEmployeeItems.controls.forEach((item: any, index: number) => {
                        this.subscribeToItemChanges(item as FormGroup);
                    });
                    console.log(lineItem.existingEmployeeList);
                },
                error: (err) => {
                    console.log(err);

                    if (err.status === 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                        lineItem.existingEmployeeList = [];
                        lineItem.existingEmployeeItems = this.fb.array([]);
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    removeNewEmployee(outerIndex: number, index: number, candidateId: number) {
        console.log(this.newEmployeeLineItems);
        const lineItem = this.newEmployeeLineItems[outerIndex];
        console.log(lineItem);
        lineItem.newEmployeeList = lineItem?.newEmployeeList.filter((e: any) => e.candidateId !== candidateId);
        console.log(lineItem.newEmployeeList);
        console.log(lineItem.newEmployeeItems);
        lineItem.newEmployeeItems.removeAt(index);
    }

    removeExistingEmployee(outerIndex: number, index: number, candidateId: number) {
        const lineItem = this.existingEmployeeLineItems[outerIndex];
        console.log(lineItem);
        lineItem.existingEmployeeList = lineItem.existingEmployeeList.filter((e: any) => e.candidateId !== candidateId);
        console.log(lineItem.existingEmployeeList);
        console.log(lineItem.existingEmployeeItems);
        lineItem.existingEmployeeItems.removeAt(index);
    }

    mapItems(list: any[]) {
        return list.map((item: any) => ({
            candidate: {
                candidateId: item.candidate.candidateId
            },
            monthsAllowed: item.monthsAllowed,
            unitRate: item.unitRate,
            taxRate: item.taxRate
        }));
    }

    onSubmit() {
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
                items: [...this.mapItems(this.newEmployeeItems.value), ...this.mapItems(this.existingEmployeeItems.value)]
            };

            console.log(data);

            // this.apiService.mapNewPurchaseOrder(data).subscribe({
            //   next: val => {
            //     console.log(val);
            //     this.messageService.add({severity:'success', summary: 'Success', detail: 'Purchase Order Created Successfully'});
            //     this.router.navigate(['/home/po-assign']);
            //   },
            //   error: err => {
            //     console.log(err);

            //     if (err.status == 400) {
            //       this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
            //     }
            //   }
            // })
        } catch (error) {
            console.log(error);
        }
    }
    submitPO1() {
        try {
            const formValue = this.mapPOForm.value;

            const payload: any = {
                poNumber: formValue.poNumber,
                consultancy: {
                    userId: formValue.consultancy.userId
                },
                poDate: formValue.poDate,
                validFrom: formValue.validFrom,
                validTo: formValue.validTo,
                totalValue: formValue.totalValue,
                items: []
            };

            console.log(console.log('Line Items:', this.newEmployeeLineItems));
            console.log(console.log('Line Items:', this.newEmployeeLineItems));

            // LOOP LINE ITEMS
            this.newEmployeeLineItems.forEach((item) => {
                console.log('newEmployeeList =', item.newEmployeeList);
                console.log('newEmployeeList =', item.newEmployeeItems.value);
                payload.items.push({
                    candidate: {
                        candidateId: item.newEmployeeItems.value.candidateId
                    },
                    monthsAllowed: item.newEmployeeItems.value.monthsAllowed,
                    unitRate: item.newEmployeeItems.value.unitRate,
                    taxRate: item.newEmployeeItems.value.taxRate
                });
            });

            /*   this.newEmployeeLineItems.forEach((lineItem: any) => {

    // LOOP EMPLOYEES INSIDE THE LINE ITEM
    lineItem.newEmployeeItems.forEach((emp: any) => {

      payload.items.push({
        candidate: {
          candidateId: emp.candidateId
        },
        monthsAllowed: emp.monthsAllowed,
        unitRate: emp.unitRate,
        taxRate: emp.taxRate
      });

    });
  }); */

            console.log('FINAL PAYLOAD: ', payload);
        } catch (e) {}
    }

    submitPO() {
        try {
            const formValue = this.mapPOForm.value;

            const payload: any = {
                poNumber: formValue.poNumber,
                consultancy: {
                    userId: formValue.consultancy.userId
                },
                poDate: formValue.poDate,
                validFrom: formValue.validFrom,
                validTo: formValue.validTo,
                totalValue: formValue.totalValue,
                items: []
            };

            // LOOP → LINE ITEMS
            this.newEmployeeLineItems.forEach((lineItem: any) => {
                // LOOP → EMPLOYEE ROWS inside that line item
                lineItem?.newEmployeeItems?.value?.forEach((item: any) => {
                    payload?.items?.push({
                        candidate: { candidateId: item.candidate.candidateId },
                        monthsAllowed: item.monthsAllowed,
                        unitRate: item.unitRate,
                        taxRate: item.taxRate
                    });
                });
            });

            this.existingEmployeeLineItems.forEach((lineItem: any) => {
                lineItem?.existingEmployeeItems?.value?.forEach((item: any) => {
                    payload.items.push({
                        candidate: { candidateId: item.candidate.candidateId },
                        monthsAllowed: item.monthsAllowed,
                        unitRate: item.unitRate,
                        taxRate: item.taxRate
                    });
                });
            });

            console.log('FINAL PAYLOAD =', payload);

            this.apiService.mapNewPurchaseOrder(payload).subscribe({
                next: (val) => {
                    console.log(val);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Purchase Order Created Successfully' });
                    this.router.navigate(['/home/po-assign']);
                },
                error: (err) => {
                    console.log(err);

                    if (err.status == 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}
