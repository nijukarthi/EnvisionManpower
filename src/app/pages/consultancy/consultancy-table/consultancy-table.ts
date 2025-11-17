import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-consultancy-table',
  imports: [Shared],
  templateUrl: './consultancy-table.html',
  styleUrl: './consultancy-table.scss'
})
export class ConsultancyTable implements OnInit {
  consultancyList: any;

  consultancyId:any;
  openAddConsultancy:boolean = false;
  consultancyForm:any;
  actionName:any = 'Add';

  loggedUserGroupId = Number(sessionStorage.getItem('userGroupId'));

  offSet = 0;
  pageSize = 10;

    constructor(
    private apiService: Apiservice,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb:FormBuilder
  ){}

  ngOnInit(){
    this.fetchActiveConsultancy();
  }

  getMenuItems(consultancy: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.router.navigate(['/home/consultancies', consultancy.userId])
       },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteConsultancy(consultancy)
      }
    ]
  }

  fetchActiveConsultancy(){
    try {
      const data ={
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      this.apiService.fetchActiveConsultancy(data).subscribe({
        next: val => {
          console.log(val);
          this.consultancyList = val?.data.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  deleteConsultancy(consultancy: any){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: `Delete ${consultancy.consultancyName}`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        try {
          const data = {
            userId: consultancy.userId
          }

          this.apiService.deleteConsultancy(data).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Consultancy Deleted Successfully'});
              this.fetchActiveConsultancy();
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
}

