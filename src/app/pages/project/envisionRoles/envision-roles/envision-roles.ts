import { EnvisionRolesService } from '@/service/masters/envisionRoles/envision-roles';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-envision-roles',
  imports: [Shared],
  templateUrl: './envision-roles.html',
  styleUrl: './envision-roles.scss'
})
export class EnvisionRoles implements OnInit {
  openRole = false;

  roleId = 0;

  roleList$!: Observable<any>;

  private rolesService = inject(EnvisionRolesService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  roleForm = this.fb.group({
    id: [0],
    roleName: ['']
  })

  ngOnInit(): void {
    this.roleList$ = this.rolesService.fetchActiveEnvisionRoles();
  }

  getMenuItems(role: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editRole(role.id)
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteRole(role)
      }
    ]
  }

  addRole(){
    try {
      this.openRole = true;
    } catch (error) {
      console.log(error);
    }
  }

  fetchViewRole(roleId: number){
    try {
      this.rolesService.fetchViewRole(roleId).subscribe({
        next: val => {
          console.log(val);
          this.roleForm.patchValue(val);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  editRole(roleId: number){
    try {
      this.roleId = roleId;
      this.openRole = true;
      this.fetchViewRole(this.roleId);
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    try {
      console.log(this.roleForm.value);
      if (!this.roleId) {
        this.rolesService.createNewRole(this.roleForm.value).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Role Created Successfully'});
            setTimeout(() => {
              this.router.navigate(['/home']).then(success => {
                if (success) {
                  this.router.navigate(['/home/roles']);
                }
              })
            }, 2000);
          },
          error: err => {
            console.log(err);
          }
        })
      } else{
        this.roleForm.patchValue({
          id: this.roleId
        })

        this.rolesService.updateRole(this.roleForm.value).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Role Updated Successfully'});
            setTimeout(() => {
              this.router.navigate(['/home']).then(success => {
                if (success) {
                  this.router.navigate(['/home/roles']);
                }
              })
            }, 2000);
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

  deleteRole(role: any){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: `Delete ${role.roleName}`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        try {
          this.rolesService.deleteRole(role.id).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Record deleted'})
              setTimeout(() => {
              this.router.navigate(['/home']).then(success => {
                if (success) {
                  this.router.navigate(['/home/roles']);
                }
              })
            }, 2000);
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

  onDialogClose(){

  }
}
