import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-envisionroles',
  imports: [Shared, ReactiveFormsModule],
  templateUrl: './envisionroles.html',
  styleUrl: './envisionroles.scss'
})
export class Envisionroles {

  openNewRoleyPopup = false;
  roleId: any;
  /* private apiService = inject(Category);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService); */
  roleList:any;
  roleForm:any;
  actionName:any = "Save";

   constructor(private messageService: MessageService, private apiService: Apiservice, private fb: FormBuilder,private route:Router,private confirmationService:ConfirmationService) { }
  

  ngOnInit(): void {
    this.roleForm = this.fb.group({
     roleId: [''],
     roleName: ['',Validators.required]
   })
   this.fetchViewRole('');
    //this.roleList = this.apiService.fetchActiveCategory('');
  }

  addRoles(){
    try {
      this.openNewRoleyPopup = true;
      this.actionName = "Save";
    } catch (error) {
      console.log(error);
    }
  }

  fetchViewRole(categoryId: any){
    
    this.apiService.fetchActiveEnvRole('').subscribe({
      next: val =>{
        console.log(val);
        this.roleList = val.data
        //this.roleForm.patchValue(val);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  editRole(roleId: number){
    try {
      this.roleId = roleId;
      this.openNewRoleyPopup = true;
      this.actionName = "Update";
       if (this.roleId) {     
        this.roleForm.patchValue({
          roleId:this.roleId.roleId,
          roleName:this.roleId.roleName});
         
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    try {
      console.log(this.roleForm.value);
      if (!this.roleId) {  
        if(this.roleForm.valid){
          var name = this.roleForm.get('roleName').value
          let data = {
            roleName:name
          }
          this.apiService.createNewEnvRole(data).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Role Added Successfully'
        })
            this.openNewRoleyPopup = false;
            this.roleForm.reset();
            this.fetchViewRole('');
           /*  this.route.navigate(['/home']).then(success => {
              if(success){
                this.route.navigate(['/home/categories']);
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
          detail: 'Please Enter Role'
        })
        }
        
      } else{
        if(this.roleForm.valid){
           this.roleForm.patchValue({
          roleId: this.roleId.id
        });

        let data = {
            "id": this.roleForm.get('roleId').value,
            "roleName":this.roleForm.get('roleName').value
          }

        this.apiService.updateEnvRole(data).subscribe({
          next: val => {
            console.log(val);
             this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Role Updated Successfully'
        })
            this.openNewRoleyPopup = false;
            this.roleForm.reset();
            this.fetchViewRole('');
            /* this.route.navigate(['/home']).then(success => {
              if(success){
                this.route.navigate(['/home/categories']);
              }
            }) */
          },
          error: err =>{
            console.log(err);
          }
        })
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please Enter Role'
          })
        }
       
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteRole(roleId: number, roleName: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: `Delete ${roleName}`,
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
      accept: () => {
        try {
          let data = {
            id:roleId
          }
          this.apiService.deleteEnvRole(data).subscribe({
            next: val => {
              console.log(val);
              this.fetchViewRole('');
             /*  setTimeout(() => {
                this.route.navigate(['/home']).then(success => {
                  if(success){
                    this.route.navigate(['/home/categories']);
                  }
                })
              }, 1000); */
            },
            error: err => {
              console.log(err);
            }
          })
        } catch (error) {
          console.log(error);
        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role Deleted Successfully'});
      }
    })
  }

  onDialogClose(){
    this.roleId = null;
    this.roleForm.reset();
  }

}
