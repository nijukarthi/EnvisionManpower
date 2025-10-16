import { Component, inject, OnInit } from '@angular/core';
import { Shared } from "@/service/shared";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Department } from '@/service/masters/department/department';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Observable } from 'rxjs';
import { Apiservice } from '@/service/apiservice/apiservice';

@Component({
  selector: 'app-department-table',
  imports: [Shared, ReactiveFormsModule, ConfirmDialogModule],
  templateUrl: './department-table.html',
  styleUrl: './department-table.scss'
})
export class DepartmentTable implements OnInit {
  openNewDepartmentPopup = false;

  departmentId: any;

 /* private departmentService = inject(Department);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService); */

  departmentList: any;

  departmentForm :any;
  actionName:any = "Save";

    constructor(private messageService: MessageService, private apiService: Apiservice, private fb: FormBuilder,private route:Router,private confirmationService:ConfirmationService) { }
  

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
    departmentId: [],
    departmentName: ['',Validators.required]
  })
    this.fetchViewDepartment('');
  }

  addDepartment(){
    try {
      this.openNewDepartmentPopup = true;
      this.actionName = "Save";
    } catch (error) {
      console.log(error);
    }
  }

  fetchViewDepartment(departmentId: any){
    let data = {
      departmentId:departmentId ? "" : ""
    }
    this.apiService.fetchActiveDepartments(data).subscribe({
      next: val => {
        console.log(val);
        this.departmentList = val.data
        
      },
      error: err => {
        console.log(err);
      }
    })
  }

  editDepartment(department: any){
    try {
      this.departmentId = department;
      this.openNewDepartmentPopup = true;
      this.actionName = "Update";

      if (this.departmentId) {     
        this.departmentForm.patchValue({
          departmentId:this.departmentId.departmentId,
          departmentName:this.departmentId.departmentName});
         
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    console.log(this.departmentForm.value);
    if (!this.departmentId) {
      if(this.departmentForm.valid){
        var name = this.departmentForm.get('departmentName').value
      let data = {
        departmentName:name
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
          this.fetchViewDepartment('');
          /* this.route.navigate(['/home']).then(success => {
            if (success) {
              this.route.navigate(['/home/departments']);
            }
          }) */
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

       let data = {
            "departmentId": this.departmentForm.get('departmentId').value,
            "departmentName":this.departmentForm.get('departmentName').value
          }
          this.apiService.updateDepartment(data)
          .subscribe({
            next:(res)=>{
              this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Department Updated Successfully'
        })
          this.openNewDepartmentPopup = false;
          this.departmentForm.reset();
          this.fetchViewDepartment('');
            },error:(error)=>{
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
        let data = {
          departmentId:departmentId
        }
        this.apiService.deleteDepartment(data).subscribe({
          next: val => {
            console.log(val);
            this.fetchViewDepartment('');
            /* setTimeout(() => {
              this.route.navigate(['/home']).then(success => {
                if (success) {
                  this.route.navigate(['/home/departments']);
                }
              })
            }, 1000); */
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
