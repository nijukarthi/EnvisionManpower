import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-consultancy-table',
  imports: [ButtonModule, TableModule,Shared],
  templateUrl: './consultancy-table.html',
  styleUrl: './consultancy-table.scss'
})
export class ConsultancyTable {
  consultancy = [
    {
      id: 1,
      name: 'Cloute Technology',
      phone: 7548839399,
      email: 'cloute.co.in',
    }
  ]

  consultancyId:any;
  openAddConsultancy:boolean = false;
  consultancyForm:any;
  actionName:any = 'Add';

    constructor(
    private apiService: Apiservice,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb:FormBuilder
  ){}

  ngOnInit(){
    this.consultancyForm = this.fb.group({
    name: [''],
    phone: [''],
    email: [''],
    })
  }


  addConsultancy(){
    try{
      this.openAddConsultancy = true;
    }catch(e){
  
    }
  }

  onSubmit(){
    try{

    }catch(e){

    }
  }

    onDialogClose(){
    this.consultancyId = null;
    this.consultancyForm.reset();
  }
}

