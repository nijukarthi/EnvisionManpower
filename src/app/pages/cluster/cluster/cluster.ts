import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { FormFieldError } from '@/directives/form-field-error';

@Component({
    selector: 'app-cluster',
    imports: [Shared, FormFieldError],
    templateUrl: './cluster.html',
    styleUrl: './cluster.scss'
})
export class Cluster implements OnInit {
    openCluster = false;
    clusterId: any;

    actionName = '';
    /*   apiService = inject(apiService);
  fb = inject(FormBuilder);
  apiService = inject(CompanyUsersService);
  router = inject(Router);
  messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService); */
    clusterList: any;
    userList: any[] = [];
    clusterForm: any;

    constructor(
        private messageService: MessageService,
        private apiService: Apiservice,
        private fb: FormBuilder,
        private route: Router,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.clusterForm = this.fb.group({
            clusterId: [0],
            clusterName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            clusterCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            clusterHead: this.fb.group({
                userId: [null, Validators.required]
            })
        });
        this.fetchActiveCluster();

        //this.clusterList$ = this.apiService.getActiveClusters();
    }

    get clusterName() {
        return this.clusterForm.get('clusterName');
    }
    get clusterCode() {
        return this.clusterForm.get('clusterCode');
    }
    get clusterHead() {
        return this.clusterForm.get('clusterHead.userId');
    }

    getMenuItems(cluster: any) {
        return [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => this.editCluster(cluster)
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => this.deleteCluster(cluster)
            }
        ];
    }

    fetchActiveCluster() {
        try {
            this.apiService.getActiveClusters('').subscribe({
                next: (val: any) => {
                    console.log(val);
                    this.clusterList = val?.data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    fetchUserList() {
        const data = {
            userGroupId: UserGroups.CLUSTERHEAD
        };
        this.apiService.findUserGroup(data).subscribe({
            next: (val: any) => {
                console.log(val);
                this.userList = val.data;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    addCluster() {
        try {
            this.openCluster = true;
            this.actionName = 'Save';
            this.fetchUserList();
        } catch (error) {
            console.log(error);
        }
    }

    editCluster(cluster: any) {
        console.log(cluster);
        try {
            this.clusterId = cluster.clusterId;
            this.openCluster = true;
            this.actionName = 'Update';
            this.fetchUserList();
            this.clusterForm.patchValue({
                clusterId: cluster.clusterId,
                clusterName: cluster.clusterName,
                clusterCode: cluster.clusterCode,
                clusterHead: {
                    userId: cluster.clusterHead.userId
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    onSubmit() {
        try {
            console.log(this.clusterForm.value);
            if (!this.clusterId) {
                if (this.clusterForm.valid) {
                    let data = {
                        clusterName: this.clusterForm.get('clusterName').value,
                        clusterCode: this.clusterForm.get('clusterCode').value,
                        clusterHead: {
                            userId: this.clusterForm.get('clusterHead.userId').value
                        }
                    };
                    console.log(data);
                    this.apiService.createNewCluster(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cluster Created Successfully' });
                            this.openCluster = false;
                            this.clusterForm.reset();
                            this.fetchActiveCluster();
                        },
                        error: (err) => {
                            console.log(err);
                            if (err.status === 400) {
                                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                            }
                        }
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Fill All Details'
                    });
                }
            } else {
                if (this.clusterForm.valid) {
                    let data = {
                        clusterId: this.clusterId,
                        clusterName: this.clusterForm.get('clusterName').value,
                        clusterCode: this.clusterForm.get('clusterCode').value,
                        clusterHead: {
                            userId: this.clusterForm.get('clusterHead.userId').value
                        }
                    };

                    this.apiService.updateCluster(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cluster Updated Successfully' });
                            this.openCluster = false;
                            this.clusterForm.reset();
                            this.fetchActiveCluster();
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
        }
    }

    deleteCluster(cluster: any) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: `Delete ${cluster.clusterName}`,
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
                    let data = {
                        clusterId: cluster.clusterId
                    };
                    this.apiService.deleteCluster(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cluster Deleted Successfully' });
                            this.fetchActiveCluster();
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

    onDialogClose() {
        this.clusterId = null;
        this.clusterForm.reset();
    }
}
