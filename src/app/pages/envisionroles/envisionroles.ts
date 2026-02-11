import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormFieldError } from '@/directives/form-field-error';
import { UserGroups } from '@/models/usergroups/usergroups.enum';

@Component({
    selector: 'app-envisionroles',
    imports: [Shared, ReactiveFormsModule, FormFieldError],
    templateUrl: './envisionroles.html',
    styleUrl: './envisionroles.scss'
})
export class Envisionroles {
    offSet = 0;
    pageSize = 10;
    first = 0;
    totalRecords = 0;

    filteredData: any;

    menuItems: any[] = [];
    selectedEnvisionroles: any;

    openNewRoleyPopup = false;
    roleId: any;
    roleList: any;
    roleForm: any;
    actionName: any = 'Save';

    currentUser = Number(sessionStorage.getItem('userGroupId'));
    
    USERGROUPS = UserGroups;

    constructor(
        private messageService: MessageService,
        private apiService: Apiservice,
        private fb: FormBuilder,
        private route: Router,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.menuItems = this.getMenuItems();
        this.roleForm = this.fb.group({
            roleId: [''],
            roleName: ['', Validators.required]
        });
        this.fetchActiveEnvRole();
    }
    
    get roleName() {
        return this.roleForm.get('roleName');
    }

    getMenuItems() {
        return [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => this.editRole(this.selectedEnvisionroles)
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => this.deleteRole(this.selectedEnvisionroles)
            }
        ];
    }

    envisionrolesApi(data: any) {
        try {
            this.apiService.fetchActiveEnvRole(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.roleList = val.data.data;
                    this.totalRecords = val?.data.length ?? 0;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    addRoles() {
        try {
            this.openNewRoleyPopup = true;
            this.actionName = 'Save';
        } catch (error) {
            console.log(error);
        }
    }

    fetchActiveEnvRole() {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize
            };

            console.log(data);

            this.envisionrolesApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    editRole(roleId: number) {
        try {
            this.roleId = roleId;
            this.openNewRoleyPopup = true;
            this.actionName = 'Update';
            if (this.roleId) {
                this.roleForm.patchValue({
                    roleId: this.roleId.roleId,
                    roleName: this.roleId.roleName
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    onSubmit() {
        try {
            console.log(this.roleForm.value);
            if (!this.roleId) {
                if (this.roleForm.valid) {
                    var name = this.roleForm.get('roleName').value;
                    let data = {
                        roleName: name
                    };
                    this.apiService.createNewEnvRole(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Role Added Successfully'
                            });
                            this.openNewRoleyPopup = false;
                            this.roleForm.reset();
                            this.fetchActiveEnvRole();
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
                        detail: 'Please Enter Role'
                    });
                }
            } else {
                if (this.roleForm.valid) {
                    this.roleForm.patchValue({
                        roleId: this.roleId.id
                    });

                    let data = {
                        id: this.roleForm.get('roleId').value,
                        roleName: this.roleForm.get('roleName').value
                    };

                    this.apiService.updateEnvRole(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Role Updated Successfully'
                            });
                            this.openNewRoleyPopup = false;
                            this.roleForm.reset();
                            this.fetchActiveEnvRole();
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
                        detail: 'Please Enter Role'
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteRole(role: any) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: `Delete ${role.roleName}`,
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
                        id: role.id
                    };
                    this.apiService.deleteEnvRole(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.fetchActiveEnvRole();
                        },
                        error: (err) => {
                            console.log(err);
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role Deleted Successfully' });
            }
        });
    }

    envisionrolesMenu(event: Event, menu: any, envisionroles: any) {
        this.selectedEnvisionroles = envisionroles;
        menu.toggle(event);
    }

    onDialogClose() {
        this.roleId = null;
        this.roleForm.reset();
    }

    loadEnvisionroles(event: any) {
        try {
            this.first = event.first;
            this.offSet = event.first / event.rows;
            this.pageSize = event.rows;

            const filters = event.filters;
            console.log(filters);

            this.filteredData = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                search: filters?.roleName?.[0]?.value ?? null
            };

            console.log(this.filteredData);
            this.envisionrolesApi(this.filteredData);
        } catch (error) {
            console.log(error);
        }
    }
}
