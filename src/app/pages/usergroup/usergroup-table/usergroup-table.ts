import { Component, inject, OnInit } from '@angular/core';
import { Shared } from "@/service/shared";
import { Usergroup } from '@/service/masters/usergroup/usergroup';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-usergroup-table',
  imports: [Shared],
  templateUrl: './usergroup-table.html',
  styleUrl: './usergroup-table.scss'
})
export class UsergroupTable implements OnInit {
  openUsergroup = false;

  userGroupId: number | null = null;

  private userGroupService = inject(Usergroup);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  usergroupList$!: Observable<any>;

  usergroupForm = this.fb.group({
    userGroupId: [0],
    userGroupName: ['']
  })

  ngOnInit(): void {
    this.usergroupList$ = this.userGroupService.fetchActiveUsergroup();
  }

  getMenuItems(usergroup: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editUserGroup(usergroup.userGroupId)
      },
      // {
      //   label: 'Delete',
      //   icon: 'pi pi-trash',
      //   command: () => this.deleteUserGroup(usergroup)
      // }
    ];
  }

  addUserGroup(){
    try {
      this.openUsergroup = true;
    } catch (error) {
      console.log(error);
    }
  }

  fetchViewUserGroup(userGroupId: number){
    try {
      this.userGroupService.fetchViewUsergroup(userGroupId).subscribe({
        next: val => {
          console.log(val);
          this.usergroupForm.patchValue(val);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  editUserGroup(usergroupId: number){
    try {
      this.userGroupId = usergroupId;
      this.openUsergroup = true;
      this.fetchViewUserGroup(this.userGroupId);
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    try {
      console.log(this.usergroupForm.value);
      if (!this.userGroupId) {
        this.userGroupService.createNewUsergroup(this.usergroupForm.value).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'User Group Created Successfully'});
            setTimeout(() => {
              this.router.navigate(['/home']).then(success => {
                if (success) {
                  this.router.navigate(['/home/usergroups']);
                }
              })
            }, 2000);
          },
          error: err => {
            console.log(err);
          }
        })
      } else {
        this.usergroupForm.patchValue({
          userGroupId: this.userGroupId
        })

        this.userGroupService.updateUserGroup(this.usergroupForm.value).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'User Group Updated Successfully'});
            setTimeout(() => {       
              this.router.navigate(['/home']).then(success => {
                if (success) {
                  this.router.navigate(['/home/usergroups']);
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

  deleteUserGroup(usergroup: any){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: `Delete ${usergroup.userGroupName}`,
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
          this.userGroupService.deleteUserGroup(usergroup.userGroupId).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Record deleted'});
              setTimeout(() => {       
                this.router.navigate(['/home']).then(success => {
                  if (success) {
                    this.router.navigate(['/home/usergroups']);
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
    this.userGroupId = null;
    this.usergroupForm.reset();
  }
}
