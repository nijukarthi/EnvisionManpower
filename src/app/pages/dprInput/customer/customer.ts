import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer',
  imports: [Shared],
  templateUrl: './customer.html',
  styleUrl: './customer.scss'
})
export class Customer implements OnInit {
  customerModal = false;

  customerList: any;
  selectedCustomer: any;

  customerMenuItems: any[] = [];

  private fb = inject(FormBuilder);

  constructor(private apiService: Apiservice, private messageService: MessageService){}

  customerForm = this.fb.group({
    customerId: [0],
    customerName: [''],
    revenue: [0]
  })

  ngOnInit(): void {
    this.customerMenuItems = this.getMenuItems();

    this.fetchCustomerList();
  }

  fetchCustomerList(){
    try {
      this.apiService.fetchCustomerList().subscribe({
        next: val => {
          this.customerList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  submitCustomerForm(){
    try {
      if (!this.selectedCustomer) {     
        const data = this.customerForm.value;
  
        this.apiService.createCustomer(data).subscribe({
          next: val => {
            this.customerModal = false;
            this.customerForm.reset();
            this.fetchCustomerList();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Customer Created Successfully'});
          },
          error: err => {
            console.log(err);
          }
        })
      } else {
        const data = this.customerForm.value;

        this.apiService.updateCustomer(data).subscribe({
          next: val => {
            this.customerModal = false;
            this.customerForm.reset();
            this.fetchCustomerList();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Customer Updated Successfully'});
          },
          error: err => {
            console.log(err);
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  openCustomerModal(){
    try {
      this.customerModal = true;
      if (this.selectedCustomer) {       
        this.customerForm.patchValue(this.selectedCustomer);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getMenuItems(){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.openCustomerModal()
      }
    ]
  }

  customerMenu(event: Event, menu: any, customer: any){
    this.selectedCustomer = customer;
    menu.toggle(event);
  }

  onDialogClose(){
    this.selectedCustomer = null;
    this.customerForm.reset();
  }
}
