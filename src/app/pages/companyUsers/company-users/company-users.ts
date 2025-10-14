import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyUsersService } from '@/service/masters/companyUsers/company-users';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-users',
  imports: [Shared, ReactiveFormsModule],
  templateUrl: './company-users.html',
  styleUrl: './company-users.scss'
})
export class CompanyUsers implements OnInit {
  openCompanyUser = false;

  companyUserList$!: Observable<any>;

  private usersService = inject(CompanyUsersService);
  private fb = inject(FormBuilder);

  first = 0;
  offSet = 0;
  pageSize = 10;

  companyUserForm = this.fb.group({
    userId: [0],
    userName: [''],
    email: [''],
    userGroupId: [0],
    userDepartments: this.fb.array([])
  });

  ngOnInit(): void {
      this.companyUserList$ = this.usersService.fetchActiveCompanyUsers(this.offSet, this.pageSize);
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

  addUser(){
    try {
      this.openCompanyUser = true;
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){

  }
}
