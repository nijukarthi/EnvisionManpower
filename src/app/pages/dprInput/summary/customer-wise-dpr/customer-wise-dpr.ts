import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-wise-dpr',
  imports: [Shared],
  templateUrl: './customer-wise-dpr.html',
  styleUrl: './customer-wise-dpr.scss'
})
export class CustomerWiseDpr implements OnInit {
  customerWiseDprList: any;
  filteredData: any;

  currentUserEmail = sessionStorage.getItem('userEmail');

  constructor(private apiService: Apiservice, private confirmationService: ConfirmationService, 
    private messageService: MessageService){}

  ngOnInit(): void {
    this.fetchCustomerWiseDprList();
  }

  customerWiseDprApi(data: any){
    try {   
      this.apiService.customerWiseDprList(data).subscribe({
        next: val => {
          this.customerWiseDprList = val?.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchCustomerWiseDprList(){
    try {
      const data = {
        customerName: null,
        towerModel: null,
        isExport: false
      }

      this.customerWiseDprApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  selectedWtgModel(towerName: string){
    try {
      const data = {
        ...this.filteredData,
        towerModel: towerName
      }

      this.customerWiseDprApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  exportToExcel(){
    this.confirmationService.confirm({
      message: `The Excel file will be sent to ${this.currentUserEmail}. Do you want to proceed?`,
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true
      },
      acceptButtonProps: {
          label: 'OK'
      },
      accept: () => {
        try {
          const data = {
            customerName: null,
            towerModel: null,
            isExport: true
          }
    
          this.apiService.customerWiseDprList(data).subscribe({
            next: val => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Excel file successfully send to email' });
            },
            error: err => {
              console.log(err);
            }
          })
        } catch (error) {
          console.log(error);
        }
      }
    })
  }

  loadCustomerWiseDpr(event: any){
    const filters = event.filters;

    this.filteredData = {
      customerName: filters?.customerName?.[0]?.value ?? null
    };

    this.customerWiseDprApi(this.filteredData);
  }

  get grandTotal(){
    return {
      totalWtg: this.sum('totalWtg'),
      totalNhManuf: this.sum('totalNhManuf'),
      totalNhDispatched: this.sum('totalNhDispatched'),
      nhPlantInventory: this.sum('nhPlantInventory'),
      totalBladeManuf: this.sum('totalBladeManuf'),
      totalBladeDispatched: this.sum('totalBladeDispatched'),
      bladeInventory: this.sum('bladeInventory'),
      revenue: this.sum('revenue'),
      totalFoundation: this.sum('totalFoundation'),
      totalInstallation: this.sum('totalInstallation'),
      totalCommissioning: this.sum('totalCommissioning')
    }
  }

  private sum(field: string): number{
    return this.customerWiseDprList?.reduce(
      (acc: number, item: any) => acc + (Number(item[field]) || 0),
      0
    ) || 0;
  }

  wtgModelList = [
    {
      label: 'All',
      value: null
    },
    {
      label: 'EN 156_3.3MW',
      value: 10
    },
    {
      label: 'EN 182_5.0MW',
      value: 11
    }
  ];
}
