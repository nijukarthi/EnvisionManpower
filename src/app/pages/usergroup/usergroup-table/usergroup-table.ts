import { Component, inject, OnInit } from '@angular/core';
import { Shared } from "@/service/shared";
import { Usergroup } from '@/service/masters/usergroup/usergroup';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Apiservice } from '@/service/apiservice/apiservice';

@Component({
  selector: 'app-usergroup-table',
  imports: [Shared, ReactiveFormsModule, ConfirmDialogModule],
  templateUrl: './usergroup-table.html',
  styleUrl: './usergroup-table.scss'
})
export class UsergroupTable implements OnInit {
  openUsergroup = false;

  userGroupId: any;

  /* private userGroupService = inject(Usergroup);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService); */

  usergroupList: any;

  usergroupForm:any;
  actionName:any = "Save";

  constructor(private messageService: MessageService, private apiService: Apiservice, private fb: FormBuilder,private route:Router,private confirmationService:ConfirmationService) { }
  

  ngOnInit(): void {
    this.usergroupForm = this.fb.group({
    userGroupId: [0],
    userGroupName: ['']
  })
  this.fetchViewUserGroup('');
    //this.usergroupList = this.apiService.fetchActiveUsergroup('');
  }

  getMenuItems(usergroup: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editUserGroup(usergroup),
        disabled:usergroup.userGroupId == 1
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

  fetchViewUserGroup(userGroupId: any){
    try {
      this.apiService.fetchActiveUsergroup(userGroupId).subscribe({
        next: val => {
          this.usergroupList = val.data;
          console.log(val);
          //this.usergroupForm.patchValue(val);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  editUserGroup(usergroupId: any){
    try {
      this.userGroupId = usergroupId;
      this.openUsergroup = true;
      this.usergroupForm.patchValue({
        userGroupName:this.userGroupId.userGroupName
      })
      this.actionName = "Update";
      this.fetchViewUserGroup(this.userGroupId);
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    try {
      console.log(this.usergroupForm.value);
      if(this.actionName == "Save"){
           this.apiService.createNewUsergroup(this.usergroupForm.value).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'User Group Created Successfully'});
            setTimeout(() => {
              this.route.navigate(['/home']).then(success => {
                if (success) {
                  this.route.navigate(['/home/usergroups']);
                }
              })
            }, 2000);
          },
          error: err => {
            console.log(err);
          }
        })
      }else if(this.actionName == "Update"){
        this.usergroupForm.patchValue({
          userGroupId: this.userGroupId
        })
        let data = {
          "userGroupId": this.usergroupForm.value.userGroupId.userGroupId,
          "userGroupName":this.usergroupForm.get('userGroupName').value
        }

        this.apiService.updateUserGroup(data).subscribe({
          next: val => {
            console.log(val);
            this.openUsergroup = false;
            this.usergroupForm.reset();
            this.fetchViewUserGroup('');
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'User Group Updated Successfully'});
           /*  setTimeout(() => {       
              this.route.navigate(['/home']).then(success => {
                if (success) {
                  this.route.navigate(['/home/usergroups']);
                }
              })
            }, 2000); */
          },
          error: err => {
            console.log(err);
          }
        })
      }
      if (!this.userGroupId) {
     
      } else {
        
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
          this.apiService.deleteUserGroup(usergroup.userGroupId).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Record deleted'});
              setTimeout(() => {       
                this.route.navigate(['/home']).then(success => {
                  if (success) {
                    this.route.navigate(['/home/usergroups']);
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
