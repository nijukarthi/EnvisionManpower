import { Component, inject, OnInit } from '@angular/core';
import { Shared } from "@/service/shared";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Department } from '@/service/masters/department/department';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Observable } from 'rxjs';
import { Apiservice } from '@/service/apiservice/apiservice';
import { UserGroups } from '@/models/usergroups/usergroups.enum';

@Component({
  selector: 'app-department-table',
  imports: [Shared, ReactiveFormsModule, ConfirmDialogModule],
  templateUrl: './department-table.html',
  styleUrl: './department-table.scss'
})
export class DepartmentTable implements OnInit {
  openNewDepartmentPopup = false;

  departmentId: any;

  departmentList: any;

  departmentForm :any;
  departmentHeadList: any;

  actionName:any = "Save";

    constructor(private messageService: MessageService, private apiService: Apiservice, private fb: FormBuilder,private route:Router,private confirmationService:ConfirmationService) { }
  

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
    departmentId: [],
    departmentName: ['',Validators.required],
    departmentHead: this.fb.group({
      userId: [0]
    })
  })
    this.fetchActiveDepartments();
  }

  getMenuItems(category: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editDepartment(category)
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteDepartment(category)
      }
    ]
  }

  addDepartment(){
    try {
      this.openNewDepartmentPopup = true;
      this.actionName = "Save";
      this.findUserGroup(UserGroups.DEPARTMENTHEAD);
    } catch (error) {
      console.log(error);
    }
  }

  findUserGroup(userGroupId: number){
    try {
      const data = {
        userGroupId: userGroupId
      }
      console.log(data);
      this.apiService.findUserGroup(data).subscribe({
        next: val => {
          console.log(val);
          this.departmentHeadList = val?.data;
          console.log("departmentHeadList", this.departmentHeadList);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchActiveDepartments(){
    try { 
      this.apiService.fetchActiveDepartments('').subscribe({
        next: val => {
          console.log(val);
          this.departmentList = val.data
          
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  editDepartment(department: any){
    try {
      this.departmentId = department;
      this.openNewDepartmentPopup = true;
      this.actionName = "Update";
      this.findUserGroup(UserGroups.DEPARTMENTHEAD);

      if (this.departmentId) {     
        this.departmentForm.patchValue({
          departmentId: department.departmentId,
          departmentName: department.departmentName,
          departmentHead: {
            userId: department?.departmentHead?.userId
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    console.log(this.departmentForm.value);
    if (!this.departmentId) {
      if(this.departmentForm.valid){
      const data = {
        departmentName: this.departmentForm.get('departmentName').value,
        departmentHead: {
          userId: this.departmentForm.get('departmentHead.userId').value
        }
      }
      this.apiService.createNewDepartment(data).subscribe({
        next: val => {
          console.log(val);
           this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Department Added Successfully'
        })
          this.openNewDepartmentPopup = false;
          this.departmentForm.reset();
          this.fetchActiveDepartments();
        },
        error: err => {
          console.log(err);
        }
      })
      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please Enter Department'
        })
      }
      
    } else {
      if(this.departmentForm.valid){
        this.departmentForm.patchValue({
          departmentId: this.departmentId.departmentId
        });
        console.log(this.departmentForm.value);

        const data = this.departmentForm.value;
        console.log(data);
        this.apiService.updateDepartment(data)
        .subscribe({
          next:(res)=>{
            console.log(res);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Department Updated Successfully'
            })
            this.openNewDepartmentPopup = false;
            this.departmentForm.reset();
            this.fetchActiveDepartments();
          },error:(error)=>{
            console.log(error);
              this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed To Update Please Try Again'
            })
          }
        })
      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please Enter Department'
        })
      }
     
    }
  }

  onDialogClose(){
    this.departmentId = null;
    this.departmentForm.reset();
  }

  deleteDepartment(department: any){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: `Delete ${department.departmentName}`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () =>{
        let data = {
          departmentId:department.departmentId
        }
        this.apiService.deleteDepartment(data).subscribe({
          next: val => {
            console.log(val);
            this.fetchActiveDepartments();
          },
          error: err => {
            console.log(err);
          }
        })
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Record deleted'
        })
      },
      closeOnEscape: true,
      dismissableMask: true
    })
  }
}
