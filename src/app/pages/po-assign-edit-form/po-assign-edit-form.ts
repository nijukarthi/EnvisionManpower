import { PurchaseOrderStatus } from '@/models/purchase-order-status/purchase-order-status.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-po-assign-edit-form',
  imports: [Shared],
  templateUrl: './po-assign-edit-form.html',
  styleUrl: './po-assign-edit-form.scss'
})
export class PoAssignEditForm implements OnInit {
  poId = 0;
  duration = 0;

  poDetails: any;
  poLineItemsList: any;

  private fb = inject(FormBuilder);

  updatePOForm = this.fb.group({
    poId: [0],
    poDate: [''],
    validFrom: [''],
    validTo: [''],
    items: this.fb.array([])
  })

  get poLineItems(){
    return this.updatePOForm.get('items') as FormArray;
  }

  updatePOLineItems(item: any){
    return this.fb.group({
      candidateId: [item.candidate.candidateId],
      monthsAllowed: [item.monthsAllowed],
      unitRate: [item.unitRate],
      taxRate: [item.taxRate],
      taxAmount: [item.taxAmount],
      lineTotal: [item.lineTotal],
      remove: [false]
    })
  }

  constructor(private apiService: Apiservice, private route: ActivatedRoute, private messageService: MessageService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = param.get('id');

      if (id) {
        this.poId = Number(id);
        this.fetchViewPurchaseOrder();
      }
    })
  }

  fetchViewPurchaseOrder(){
    try {
      const data = {
        poId: this.poId
      }

      this.apiService.fetchViewPurchaseOrder(data).subscribe({
        next: val => {
          console.log(val);
          this.poDetails = val?.data;
          this.populateItems();
          const converted = {
            ...val?.data,
            poDate: new Date(val?.data.poDate),
            validFrom: new Date(val?.data.validFrom),
            validTo: new Date(val?.data.validTo)
          }
          this.updatePOForm.patchValue(converted);
          this.poLineItemsList = val?.data?.items;

          const start = new Date(val?.data.validFrom);
          const end = new Date(val?.data.validTo);

          const years = end.getFullYear() - start.getFullYear();
          const months = end.getMonth() -  start.getMonth();

          this.duration = years * 12 + months;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  populateItems(){
    const formArray = this.poLineItems;
    formArray.clear();

    this.poDetails?.items.forEach((item: any) => {
      formArray.push(this.updatePOLineItems(item))
    })
  }

  calculateTax(index: number){
    const rowGroup = this.poLineItems.at(index) as FormGroup;

    const monthsAllowed = rowGroup.get('monthsAllowed')?.value || 0;
    const unitPrice = rowGroup.get('unitRate')?.value || 0;
    const taxRate = rowGroup.get('taxRate')?.value || 0;

    const taxAmount = (unitPrice * (taxRate / 100)) + unitPrice;
    const lineTotal = monthsAllowed * taxAmount;

    rowGroup.patchValue({
      taxAmount,
      lineTotal
    })
  }

  getChangedLineItems(){
    return this.poLineItems.controls
      .map((control, index) => ({
        control,
        value: this.poLineItems.getRawValue()[index]
      }))
      .filter(item => item.control.dirty);
  }

  onSubmit(){
    try {
      console.log(this.updatePOForm.getRawValue());

      const changedItems = this.getChangedLineItems().map(item => ({
        candidateId: item.value.candidateId,
        monthsAllowed: item.value.monthsAllowed,
        unitRate: item.value.unitRate,
        taxRate: item.value.taxRate,
        remove: item.value.remove
      }));
      console.log(changedItems);

      const data = {
        ...this.updatePOForm.getRawValue(),
        items: changedItems
      };

      console.log(data);

      this.apiService.updatePurchaseOrder(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Purchase Order Updated Successfully' });
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  removePOLineItem(index: number){
    try {
      const rowGroup = this.poLineItems.at(index) as FormGroup;

      const isRemoved = rowGroup.get('remove')?.value;

      rowGroup.patchValue({
        remove: !isRemoved
      })

      console.log(rowGroup.value);

      if (!isRemoved) {
        rowGroup.disable({ emitEvent: false });
      } else {
        rowGroup.enable({ emitEvent: true })
      }
    } catch (error) {
      console.log(error);
    }
  }

  getSeverity(status: string){
    switch(status){
      case PurchaseOrderStatus.DRAFT:
        return 'primary';
      case PurchaseOrderStatus.ACTIVE:
        return 'success';
      case PurchaseOrderStatus.UTILIZED:
        return 'secondary';
      case PurchaseOrderStatus.SUSPENDED:
        return 'warn';
      case PurchaseOrderStatus.EXPIRED:
        return 'danger';
      case PurchaseOrderStatus.CANCELLED:
        return 'danger';
      default:
        return 'primary';
    }
  }
}
