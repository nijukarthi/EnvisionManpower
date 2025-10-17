import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyUsersService } from '@/service/masters/companyUsers/company-users';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Apiservice } from '@/service/apiservice/apiservice';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-company-users',
  imports: [Shared, ReactiveFormsModule],
  templateUrl: './company-users.html',
  styleUrl: './company-users.scss'
})
export class CompanyUsers implements OnInit {
  openCompanyUser = false;
  showDepartments = false;

  companyUserList:any;
  userGroupList: any;
  departmentList: any;

  selectedDepartments: number[] = [];

  private fb = inject(FormBuilder);

  constructor(
    private apiService: Apiservice, 
    private messageService: MessageService
  ){}

  first = 0;
  offSet = 0;
  pageSize = 10;

  actionName = '';

  companyUserForm = this.fb.group({
    userId: [0],
    userName: [''],
    email: [''],
    userGroupId: [0],
    userDepartments: this.fb.array([this.assignDepartments()])
  });

  assignDepartments(): FormGroup{
    return this.fb.group({
      departmentId: [0]
    })
  }

  ngOnInit(): void {
    this.fetchActiveCompanyUsers();
  }

  get userDepartments() {
    return this.companyUserForm.get('userDepartments') as FormArray;
  }

  getMenuItems(user: any){
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

  fetchActiveCompanyUsers(){
    try {
      let data = {
        offSet: 0,
        pageSize: 10
      }
      this.apiService.fetchActiveCompanyUsers(data).subscribe({
        next: val => {
          console.log(val);
          this.companyUserList = val.data.data;
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
          }
        }
      })
    } catch (error) {
      console.log(error);
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please Try Again!'});
    }
  }

  fetchActiveUserGroups(){
    try {
      this.apiService.fetchActiveUsergroup('').subscribe({
        next: val => {
          console.log(val);
          this.userGroupList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please Try Again!'});
    }
  }

  fetchActiveDepartments(){
    try {
      this.apiService.fetchActiveDepartments('').subscribe({
        next: val => {
          console.log(val);
          this.departmentList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please Try Again!'});
    }
  }

  selectedUserGroup(selectedGroupId: number){
    this.showDepartments = selectedGroupId !== 301;

    // if (!this.showDepartments) {
    //   this.userDepartments.clear();
    //   this.userDepartments.push(this.assignDepartments());
    // }
  }

  selectDepartments(selectedIds: number[]){
    this.selectedDepartments = selectedIds;

    this.userDepartments.clear();

    selectedIds.forEach(id => {
      this.userDepartments.push(
        this.fb.group({
          departmentId: id
        })
      )
    })
    console.log('Form value:', this.companyUserForm.value);
  }

  addUser(){
    try {
      this.openCompanyUser = true;
      this.actionName = 'Save';
      this.fetchActiveUserGroups();
      this.fetchActiveDepartments();
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    console.log(this.companyUserForm.value);
  }
}
