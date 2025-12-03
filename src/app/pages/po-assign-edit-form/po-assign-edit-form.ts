import { PurchaseOrderStatus } from '@/models/purchase-order-status/purchase-order-status.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    poNumber: [0],
    consultancy: this.fb.group({
      userId: [0]
    }),
    poDate: [''],
    validFrom: [''],
    validTo: [''],
    totalValue: [0],
    items: this.fb.array([])
  })

  constructor(private apiService: Apiservice, private route: ActivatedRoute){}

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
          const converted = {
            ...val?.data,
            poDate: new Date(val?.data.poDate),
            validFrom: new Date(val?.data.validFrom),
            validTo: new Date(val?.data.validTo)
          }
          this.updatePOForm.patchValue(converted);
          this.poLineItemsList = val?.data?.items;

          this.poLineItemsList.forEach((item: any) => this.calculateTax(item));

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

  calculateTax(item: any){
    // console.log(item);
    const unitPrice = item.unitRate;
    const taxRate = item.taxRate;

    item.taxAmount = (unitPrice * (taxRate / 100)) + unitPrice;
  }

  onSubmit(){

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
