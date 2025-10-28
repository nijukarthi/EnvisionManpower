import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-project',
  imports: [Shared],
  templateUrl: './project.html',
  styleUrl: './project.scss'
})
export class Project implements OnInit {
  openProject = false;
  loading = false;

  projectId: number | null = null;

  UserGroups = UserGroups;

  first = 0;
  offSet = 0;
  pageSize = 10;

  actionName = '';

  private fb = inject(FormBuilder);

  constructor(private apiService: Apiservice, private messageService: MessageService, private confirmationService: ConfirmationService){}

  projectList: any;
  clusterList: any[] = [];
  clusterHeadList: any;
  siteInchargeList: any;
  departmentList: any;
  departmentHeadList: any;

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
    department: this.fb.group({
      departmentId: [0]
    }),
    departmentHead: this.fb.group({
      userId: [0]
    })
  })

  ngOnInit(): void {
    this.fetchActiveProjects();
    this.fetchActiveDepartments();
  }

  getMenuItems(project: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editProject(project)
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteProject(project)
      }
    ]
  }

  fetchActiveProjects(){
    try {
      let data = {
        offSet: 0,
        pageSize: 10
      }
      this.apiService.fetchActiveProjects(data).subscribe({
        next: val => {
          console.log(val);
          this.projectList = val?.data.data;
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchAllCluster(){
    try {
      this.apiService.getActiveClusters('').subscribe({
        next: val => {
          console.log(val);
          this.clusterList = val.data;
        },
        error: err => {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
    }
     
  }

  fetchClusterHeadByCluster(clusterId: number){
    console.log(clusterId);
    console.log('checking');
    try {
      const data = {
        clusterId: clusterId
      }
      console.log(data);
      this.apiService.fetchClusterHeadByCluster(data).subscribe({
        next: val => {
          console.log(val);
          this.clusterHeadList = val.data ? [val.data] : [];
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchDepartmentHeadByDepartment(departmentId: number){
    try {
      const data = {
        departmentId: departmentId
      }
      console.log(data);

      this.apiService.fetchDepartmentHeadByDepartment(data).subscribe({
        next: val => {
          console.log(val);
          this.departmentHeadList = val.data ? [val.data] : [];
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchActiveDepartments(){
    this.apiService.fetchActiveDepartments('').subscribe({
      next: val => {
        console.log(val);
        this.departmentList = val.data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  findUserGroup(userGroupId: number, type: 'siteIncharge' | 'departmentHead'){
    try {
      this.loading = true;

      const data = {
        userGroupId: userGroupId
      }
      console.log(data);
      this.apiService.findUserGroup(data).subscribe({
        next: val => {
          console.log(val);
          if (type === 'siteIncharge') {
            this.siteInchargeList = val?.data;
          } else if (type === 'departmentHead') {
            this.departmentHeadList = val?.data;
          }
          this.loading = false;
        },
        error: err => {
          console.log(err);
          this.loading = false;
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  addProject(){
    try {
      this.openProject = true;
      this.actionName = 'Save';
      this.fetchAllCluster();
    } catch (error) {
      console.log(error);
    }
  }

  editProject(project: any){
    try {
      this.projectId = project.projectId;
      this.openProject = true;
      this.actionName = 'Update';
      this.fetchAllCluster();
      this.fetchClusterHeadByCluster(project.cluster.clusterId);
      this.findUserGroup(UserGroups.SITEINCHARGE, 'siteIncharge');
      this.findUserGroup(UserGroups.DEPARTMENTHEAD, 'departmentHead');
      this.projectForm.patchValue({
        projectId: project.projectId,
        projectCode: project.projectCode,
        cluster: {
          clusterId: project.cluster.clusterId
        },
        siteIncharge: {
          userId: project.siteIncharge.userId
        },
        clusterHead: {
          userId: project.clusterHead.userId
        },
        department: {
          departmentId: project.department.departmentId
        },
        departmentHead: {
          userId: project.departmentHead.userId
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  onSubmit(){
    try {
      console.log(this.projectForm.value);
      if (!this.projectId) {
        if (this.projectForm.valid) {
          const data = {
            projectCode: this.projectForm.get('projectCode')?.value,
            cluster: {
              clusterId: this.projectForm.get('cluster.clusterId')?.value
            },
            siteIncharge: {
              userId: this.projectForm.get('siteIncharge.userId')?.value
            },
            clusterHead: {
              userId: this.projectForm.get('clusterHead.userId')?.value
            },
            department: {
              departmentId: this.projectForm.get('department.departmentId')?.value
            },
            departmentHead: {
              userId: this.projectForm.get('departmentHead.userId')?.value
            }
          }
          this.apiService.createNewProject(data).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Project Created Successfully'});
              this.openProject = false;
              this.projectForm.reset();
              this.fetchActiveProjects();
            },
            error: err => {
              console.log(err);
            }
          })
        }
      } else {
        if (this.projectForm.valid) {
          const data = {
            projectId: this.projectForm.get('projectId')?.value,
            projectCode: this.projectForm.get('projectCode')?.value,
            cluster: {
              clusterId: this.projectForm.get('cluster.clusterId')?.value
            },
            siteIncharge: {
              userId: this.projectForm.get('siteIncharge.userId')?.value
            },
            clusterHead: {
              userId: this.projectForm.get('clusterHead.userId')?.value
            },
            department: {
              departmentId: this.projectForm.get('department.departmentId')?.value
            },
            departmentHead: {
              userId: this.projectForm.get('departmentHead.userId')?.value
            }
          }
          this.apiService.updateProject(data).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Project Updated Successfully'});
              this.openProject = false;
              this.projectForm.reset();
              this.fetchActiveProjects();
            },
            error: err => {
              console.log(err);
            }
          })
        }
      }
    } catch (error) {
      console.log(error);
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please Try again'});
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
          const data = {
            projectId: project.projectId
          }
          this.apiService.deleteProject(data).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product Deleted Successfully'});
              this.fetchActiveProjects();
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
