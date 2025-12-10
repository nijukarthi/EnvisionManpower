import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormFieldError } from '@/directives/form-field-error';

@Component({
    selector: 'app-project',
    imports: [Shared, FormFieldError],
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
    totalRecords = 0;

    actionName = '';
    siteName = '';

    private fb = inject(FormBuilder);
    experience: any;

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    projectList: any;
    clusterList: any[] = [];
    clusterHeadList: any;
    siteInchargeList: any;
    departmentList: any;
    departmentHeadList: any;

    projectForm = this.fb.group({
        projectId: [0],
        projectCode: ['', [Validators.required, Validators.maxLength(20)]],
        siteName: ['', [Validators.required, Validators.maxLength(50)]],
        cluster: this.fb.group({
            clusterId: [0, Validators.required]
        }),
        siteIncharge: this.fb.group({
            userId: [0, Validators.required]
        }),
        clusterHead: this.fb.group({
            userId: [0, Validators.required]
        }),
        department: this.fb.group({
            departmentId: [0, Validators.required]
        }),
        departmentHead: this.fb.group({
            userId: [0, Validators.required]
        })
    });

    get projectCode() {
        return this.projectForm.get('projectCode');
    }

    get site() {
        return this.projectForm.get('siteName');
    }

    get cluster() {
        return this.projectForm.get('cluster.clusterId');
    }

    get siteIncharge() {
        return this.projectForm.get('siteIncharge.userId');
    }

    get clusterHead() {
        return this.projectForm.get('clusterHead.userId');
    }

    get department() {
        return this.projectForm.get('department.departmentId');
    }

    get departmentHead() {
        return this.projectForm.get('departmentHead.userId');
    }

    ngOnInit(): void {
        this.fetchActiveProjects();
        this.fetchActiveDepartments();
    }

    getMenuItems(project: any) {
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
        ];
    }

    fetchActiveProjects() {
        try {
            let data = {
                offSet: this.offSet,
                pageSize: this.pageSize
            };
            this.apiService.fetchActiveProjects(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.projectList = val?.data.data;
                    this.totalRecords = val?.data.length ?? 0;
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    fetchAllCluster() {
        try {
            this.apiService.getActiveClusters('').subscribe({
                next: (val) => {
                    console.log(val);
                    this.clusterList = val.data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    fetchClusterHeadByCluster(clusterId: number) {
        console.log(clusterId);
        console.log('checking');
        try {
            const data = {
                clusterId: clusterId
            };
            console.log(data);
            this.apiService.fetchClusterHeadByCluster(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.clusterHeadList = val.data ? [val.data] : [];
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    fetchDepartmentHeadByDepartment(departmentId: number) {
        try {
            const data = {
                departmentId: departmentId
            };
            console.log(data);

            this.apiService.fetchDepartmentHeadByDepartment(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.departmentHeadList = val.data ? [val.data] : [];
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    fetchActiveDepartments() {
        this.apiService.fetchActiveDepartments('').subscribe({
            next: (val) => {
                console.log(val);
                this.departmentList = val.data;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    findUserGroup(userGroupId: number, type: 'siteIncharge' | 'departmentHead') {
        try {
            this.loading = true;

            const data = {
                userGroupId: userGroupId
            };
            console.log(data);
            this.apiService.findUserGroup(data).subscribe({
                next: (val) => {
                    console.log(val);
                    if (type === 'siteIncharge') {
                        this.siteInchargeList = val?.data;
                    } else if (type === 'departmentHead') {
                        this.departmentHeadList = val?.data;
                    }
                    this.loading = false;
                },
                error: (err) => {
                    console.log(err);
                    this.loading = false;
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    addProject() {
        try {
            this.openProject = true;
            this.actionName = 'Save';
            this.fetchAllCluster();
        } catch (error) {
            console.log(error);
        }
    }

    editProject(project: any) {
        try {
            this.projectId = project.projectId;
            this.openProject = true;
            this.actionName = 'Update';
            this.fetchAllCluster();
            this.fetchClusterHeadByCluster(project.cluster.clusterId);
            this.findUserGroup(UserGroups.SITEINCHARGE, 'siteIncharge');
            this.findUserGroup(UserGroups.DEPARTMENTHEAD, 'departmentHead');
            this.siteName = project.siteName;
            this.projectForm.patchValue({
                projectId: project.projectId,
                projectCode: project.projectCode,
                siteName: project.siteName,
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
            });
        } catch (error) {
            console.log(error);
        }
    }

    onSubmit() {
        try {
            console.log(this.projectForm.value);
            if (!this.projectId) {
                if (this.projectForm.valid) {
                    const data = {
                        projectCode: this.projectForm.get('projectCode')?.value,
                        siteName: this.projectForm.get('siteName')?.value,
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
                    };
                    this.apiService.createNewProject(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project Created Successfully' });
                            this.openProject = false;
                            this.projectForm.reset();
                            this.fetchActiveProjects();
                        },
                        error: (err) => {
                            console.log(err);

                            if (err.status === 400) {
                                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                            }
                        }
                    });
                }
            } else {
                if (this.projectForm.valid) {
                    const data = {
                        projectId: this.projectForm.get('projectId')?.value,
                        projectCode: this.projectForm.get('projectCode')?.value,
                        siteName: this.projectForm.get('siteName')?.value,
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
                    };
                    this.apiService.updateProject(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project Updated Successfully' });
                            this.openProject = false;
                            this.projectForm.reset();
                            this.fetchActiveProjects();
                        },
                        error: (err) => {
                            console.log(err);

                            if (err.status === 400) {
                                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                            }
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Try again' });
        }
    }

    deleteProject(project: any) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: `Delete ${project.projectCode}`,
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
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
                    };
                    this.apiService.deleteProject(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Deleted Successfully' });
                            this.fetchActiveProjects();
                        },
                        error: (err) => {
                            console.log(err);
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    pageChange(event: any) {
        this.first = event.first;
        this.offSet = event.first / event.rows;
        this.pageSize = event.rows;
        console.log(this.offSet);
        console.log(this.pageSize);
        this.fetchActiveProjects();
    }

    onDialogClose() {
        this.projectId = null;
        this.projectForm.reset();
    }
}
