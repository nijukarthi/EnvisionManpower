import { ClusterService } from '@/service/masters/cluster/cluster';
import { CompanyUsersService } from '@/service/masters/companyUsers/company-users';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  clusterId: number | null = null;

  clusterService = inject(ClusterService);
  fb = inject(FormBuilder);
  cusService = inject(CompanyUsersService);
  router = inject(Router);
  messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  clusterList$!: Observable<any>;

  userList: any[] = [];

  clusterForm = this.fb.group({
    clusterId: [0],
    clusterName: [''],
    clusterCode: [''],
    clusterHead: this.fb.group({
      userId: [0]
    })
  })

  ngOnInit(): void {
    this.clusterList$ = this.clusterService.getActiveClusters();
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
    this.cusService.fetchAllClusterHeads().subscribe({
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

  fetchViewCluster(clusterId: number){
    try {
      this.clusterService.fetchViewCluster(clusterId).subscribe({
        next: (val: any) => {
          console.log(val);
          this.clusterForm.patchValue({
            ...val,
            clusterHead: {
              userId: Number(val.clusterHead.userId)
            }
          });
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
        this.clusterService.createNewCluster(this.clusterForm.value).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Cluster Created Successfully'});
            setTimeout(() => {  
              this.router.navigate(['/home']).then(success => {
                if(success){
                  this.router.navigate(['/home/clusters']);
                }
              })
            }, 2000);
          },
          error: err => {
            console.log(err);
          }
        })
      } else {
        this.clusterForm.patchValue({
          clusterId: this.clusterId
        })
        this.clusterService.updateCluster(this.clusterForm.value).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Cluster Updated Successfully'});
            setTimeout(() => {  
              this.router.navigate(['/home']).then(success => {
                if(success){
                  this.router.navigate(['/home/clusters']);
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
        this.clusterService.deleteCluster(cluster.clusterId).subscribe({
          next: val => {
              console.log(val);
              this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Record deleted'});
              setTimeout(() => {
                this.router.navigate(['/home']).then(success => {
                  if (success) {
                    this.router.navigate(['/home/clusters']);
                  }
                })
              }, 2000);
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
