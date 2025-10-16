import { ClusterService } from '@/service/masters/cluster/cluster';
import { CompanyUsersService } from '@/service/masters/companyUsers/company-users';
import { Department } from '@/service/masters/department/department';
import { ProjectService } from '@/service/masters/project/project';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project',
  imports: [Shared],
  templateUrl: './project.html',
  styleUrl: './project.scss'
})
export class Project implements OnInit {
  openProject = false;

  projectId: number | null = null;

  first = 0;
  offSet = 0;
  pageSize = 10;

  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);
  private clusterService = inject(ClusterService);
  private companyUserService = inject(CompanyUsersService);
  private departmentService = inject(Department);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  projectList$!: Observable<any>;
  clusterList$!: Observable<any>;
  clusterHeadList$!: Observable<any>;
  departmentList$!: Observable<any>;
  siteInchargeList$!: Observable<any>;

  projectForm = this.fb.group({
    projectId: [0],
    projectCode: [''],
    cluster: this.fb.group({
      clusterId: [0]
    }),
    siteIncharge: this.fb.group({
      userId: [0]
    }),
    clusterHead: this.fb.group({
      userId: [0]
    }),
    departmentHead: this.fb.group({
      userId: [0]
    })
  })

  ngOnInit(): void {
    this.projectList$ = this.projectService.fetchActiveProjects(this.offSet, this.pageSize);
  }

  getMenuItems(project: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editProject(project.projectId)
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteProject(project)
      }
    ]
  }

  fetchAllCluster(){
    this.clusterList$ = this.clusterService.getActiveClusters();
  }

  fetchAllClusterHead(){
    this.clusterHeadList$ = this.companyUserService.fetchAllClusterHeads();
  }

  fetchAllDepartmentHead(){
    this.departmentList$ = this.departmentService.fetchActiveDepartments();
  }

  fetchSiteIncharge(){
    this.siteInchargeList$ = this.companyUserService.fetchActiveCompanyUsers(this.offSet, this.pageSize);
  }

  addProject(){
    try {
      this.openProject = true;
      this.fetchAllCluster();
      this.fetchAllClusterHead();
      this.fetchAllDepartmentHead();
      this.fetchSiteIncharge();
    } catch (error) {
      console.log(error);
    }
  }

  fetchViewProject(projectId: number){
    try {
      this.projectService.fetchViewProject(projectId).subscribe({
        next: val => {
          console.log(val);
          this.projectForm.patchValue(val);
        },
        error: err =>{
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  editProject(projectId: number){
    try {
      this.projectId = projectId;
      this.openProject = true;
      this.fetchViewProject(this.projectId);
    } catch (error) {
      console.log(error);
    }
  }
  
  onSubmit(){
    try {
      console.log(this.projectForm.value);
      if (!this.projectId) {
        this.projectService.createNewProject(this.projectForm.value).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Project Created Successfully'});
            setTimeout(() => {    
              this.router.navigate(['/home']).then(success => {
                if (success) {
                  this.router.navigate(['/home/projects']);
                }
              })
            }, 2000);
          },
          error: err => {
            console.log(err);
          }
        })
      } else {
        this.projectForm.patchValue({
          projectId: this.projectId
        })

        this.projectService.updateProject(this.projectForm.value).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Project Updated Successfully'});
            setTimeout(() => {    
              this.router.navigate(['/home']).then(success => {
                if (success) {
                  this.router.navigate(['/home/projects']);
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

  deleteProject(project: any){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: `Delete ${project.projectCode}`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: "Cancel",
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        try {
          this.projectService.deleteProject(project.projectId).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Record Deleted'});
              setTimeout(() => {    
                this.router.navigate(['/home']).then(success => {
                  if (success) {
                    this.router.navigate(['/home/projects']);
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
    this.projectId = null;
    this.projectForm.reset();
  }
}
