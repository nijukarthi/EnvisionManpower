import { Component, inject, OnInit } from '@angular/core';
import { Shared } from "@/service/shared";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Department } from '@/service/masters/department/department';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-department-table',
  imports: [Shared, ReactiveFormsModule, ConfirmDialogModule],
  templateUrl: './department-table.html',
  styleUrl: './department-table.scss'
})
export class DepartmentTable implements OnInit {
  openNewDepartment = false;

  departmentId: number | null = null;

  private fb = inject(FormBuilder);
  private departmentService = inject(Department);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  departmentList$!: Observable<any>;

  departmentForm = this.fb.group({
    departmentId: [0],
    departmentName: ['']
  })

  ngOnInit(): void {
    this.departmentList$ = this.departmentService.fetchActiveDepartments();
  }

  addDepartment(){
    try {
      this.openNewDepartment = true;
    } catch (error) {
      console.log(error);
    }
  }

  fetchViewDepartment(departmentId: number){
    this.departmentService.fetchViewDepartment(departmentId).subscribe({
      next: val => {
        console.log(val);
        this.departmentForm.patchValue(val);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  editDepartment(departmentId: number){
    try {
      this.departmentId = departmentId;
      this.openNewDepartment = true;
      if (this.departmentId) {     
        this.fetchViewDepartment(this.departmentId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    console.log(this.departmentForm.value);
    if (!this.departmentId) {
      this.departmentService.createNewDepartment(this.departmentForm.value).subscribe({
        next: val => {
          console.log(val);
          this.router.navigate(['/home']).then(success => {
            if (success) {
              this.router.navigate(['/home/departments']);
            }
          })
        },
        error: err => {
          console.log(err);
        }
      })
    } else {
      this.departmentForm.patchValue({
        departmentId: this.departmentId
      });
      console.log(this.departmentForm.value);

      this.departmentService.updateDepartment(this.departmentForm.value).subscribe({
        next: val => {
          console.log(val);
          this.router.navigate(['/home']).then(success => {
            if (success) {
              this.router.navigate(['/home/departments']);
            }
          });
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }

  onDialogClose(){
    this.departmentId = null;
    this.departmentForm.reset();
  }

  deleteDepartment(event: Event, departmentId: number, departmentName: string){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: `Delete ${departmentName}`,
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
        this.departmentService.deleteDepartment(departmentId).subscribe({
          next: val => {
            console.log(val);
            setTimeout(() => {
              this.router.navigate(['/home']).then(success => {
                if (success) {
                  this.router.navigate(['/home/departments']);
                }
              })
            }, 1000);
          },
          error: err => {
            console.log(err);
          }
        })
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted'
        })
      },
      closeOnEscape: true,
      dismissableMask: true
    })
  }
}
