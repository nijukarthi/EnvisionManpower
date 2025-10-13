import { Component, inject, OnInit } from '@angular/core';
import { Shared } from "@/service/shared";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Department } from '@/service/masters/department/department';

@Component({
  selector: 'app-department-table',
  imports: [Shared, ReactiveFormsModule],
  templateUrl: './department-table.html',
  styleUrl: './department-table.scss'
})
export class DepartmentTable implements OnInit {
  openNewDepartment = false;

  private fb = inject(FormBuilder);
  private departmentService = inject(Department);

  departmentList: any[] = [];

  departmentForm = this.fb.group({
    departmentName: ['']
  })

  ngOnInit(): void {
      this.departmentService.fetchActiveDepartments().subscribe({
        next: (val: any) => {
          console.log(val);
          this.departmentList = val;
        },
        error: err => {
          console.log(err);
        }
      })
  }

  addDepartment(){
    try {
      this.openNewDepartment = true;
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    console.log(this.departmentForm.value);
    this.departmentService.createNewDepartment(this.departmentForm.value).subscribe({
      next: val => {
        console.log(val);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
