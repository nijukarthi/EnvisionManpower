import { PurchaseOrderStatus } from '@/models/purchase-order-status/purchase-order-status.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-po-assign-table',
  imports: [Shared],
  templateUrl: './po-assign-table.html',
  styleUrl: './po-assign-table.scss'
})
export class PoAssignTable implements OnInit {
  poList: any; 

  offSet = 0;
  pageSize = 10;
  first = 0;
  totalRecords = 0;

  items = [
    {
      label: 'PO Status',
      icon: 'pi pi-exclamation-circle',
      items: [
        {
          label: PurchaseOrderStatus.ACTIVE
        },
        {
          label: PurchaseOrderStatus.UTILIZED
        },
        {
          label: PurchaseOrderStatus.SUSPENDED
        },
        {
          label: PurchaseOrderStatus.EXPIRED
        },
        {
          label: PurchaseOrderStatus.CANCELLED
        },
      ]
    }
  ];

  constructor(private apiService: Apiservice){}

  ngOnInit(): void {
    this.fetchPOList();
  }

  getMenuItems(po: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil'
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash'
      }
    ]
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

  fetchPOList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      console.log(data);

      this.apiService.fetchPOList(data).subscribe({
        next: val => {
          console.log(val);
          this.poList = val?.data?.data.map((po: any) => {
            const start = new Date(po.validFrom);
            const end = new Date(po.validTo);

            const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

            return {
              ...po,
              duration: `${months} months`
            }
          });
          this.totalRecords = val?.data?.length ?? 0;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  pageChange(event: any){
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    this.fetchPOList();
  }
}
