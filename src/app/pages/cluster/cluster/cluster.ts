import { Apiservice } from '@/service/apiservice/apiservice';
import { CompanyUsersService } from '@/service/masters/companyUsers/company-users';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cluster',
  imports: [Shared],
  templateUrl: './cluster.html',
  styleUrl: './cluster.scss'
})
export class Cluster implements OnInit{
  openCluster = false;
  clusterId: any;
/*   apiService = inject(apiService);
  fb = inject(FormBuilder);
  apiService = inject(CompanyUsersService);
  router = inject(Router);
  messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService); */
  clusterList:any;
  userList: any[] = [];
  clusterForm:any;

    constructor(private messageService: MessageService, private apiService: Apiservice, private fb: FormBuilder,private route:Router,private confirmationService:ConfirmationService) { }
  

  ngOnInit(): void {
     this.clusterForm = this.fb.group({
    clusterId: [0],
    clusterName: ['',Validators.required],
    clusterCode: ['',Validators.required],
    clusterHead: this.fb.group({
      userId: [3]
    })
  })
   this.fetchViewCluster('');

    //this.clusterList$ = this.apiService.getActiveClusters();
  }

  getMenuItems(cluster: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editCluster(cluster.clusterId)
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteCluster(cluster)
      }
    ]
  }

  fetchUserList(){
    this.apiService.getActiveClusters('').subscribe({
      next: (val: any) => {
        console.log(val);
        this.userList = val;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  addCluster(){
    try {
      this.openCluster = true;
      this.fetchUserList();
    } catch (error) {
      console.log(error);
    }
  }

  fetchViewCluster(clusterId: any){
    try {
      this.apiService.getActiveClusters(clusterId).subscribe({
        next: (val: any) => {
          console.log(val);
          this.clusterList = val.data
         /*  this.clusterForm.patchValue({
            ...val,
            clusterHead: {
              userId: Number(val.clusterHead.userId)
            }
          }); */
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  editCluster(clusterId: number){
    try {
      this.clusterId = clusterId;
      this.openCluster = true;
      this.fetchViewCluster(this.clusterId);
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    try {
      console.log(this.clusterForm.value);
      if (!this.clusterId) {
        if(this.clusterForm.valid){
           let data = {
          "clusterName": "Tamilnadu",
          "clusterCode": "TN",
          "clusterHead": {
            "userId": 3  //userId From User Master that Who hasl cluster head user group
          } 
        }
        this.apiService.createNewCluster(data).subscribe({
          next: val => {
            console.log(val);
            this.openCluster = false;
            this.clusterForm.reset();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Cluster Created Successfully'});
           /*  setTimeout(() => {  
              this.route.navigate(['/home']).then(success => {
                if(success){
                  this.route.navigate(['/home/clusters']);
                }
              })
            }, 2000); */
          },
          error: err => {
             this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});

          }
        })
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Fill All Details'
          })
        }
       
      } else {
        this.clusterForm.patchValue({
          clusterId: this.clusterId
        })
        let data = {
          "clusterId":  this.clusterForm.get('clusterId').value,
          "clusterName": this.clusterForm.get('clusterName').value,
          "clusterCode": this.clusterForm.get('clusterCode').value,
          "clusterHead": {
            "userId": this.clusterForm.get('userId').value
          }
        }
        this.apiService.updateCluster(data).subscribe({
          next: val => {
            console.log(val);
            this.openCluster = false;
            this.clusterForm.reset();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Cluster Updated Successfully'});
            /* setTimeout(() => {  
              this.route.navigate(['/home']).then(success => {
                if(success){
                  this.route.navigate(['/home/clusters']);
                }
              })
            }, 2000); */
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

  deleteCluster(cluster: any){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: `Delete ${cluster.clusterName}`,
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
        let data = {
          clusterId:cluster.clusterId
        }
        this.apiService.deleteCluster(data).subscribe({
          next: val => {
              console.log(val);
              this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Record deleted'});
              this.fetchViewCluster('');
              /* setTimeout(() => {
                this.route.navigate(['/home']).then(success => {
                  if (success) {
                    this.route.navigate(['/home/clusters']);
                  }
                })
              }, 2000); */
            },
            error: err => {
              console.log(err);
            }
        })
      }
    })
  }

  onDialogClose(){
    this.clusterId = null;
    this.clusterForm.reset();
  }
}
