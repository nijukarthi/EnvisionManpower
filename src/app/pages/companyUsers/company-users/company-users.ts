import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apiservice } from '@/service/apiservice/apiservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormFieldError } from '@/directives/form-field-error';
import { min } from 'rxjs';

@Component({
    selector: 'app-company-users',
    imports: [Shared, ReactiveFormsModule, FormFieldError],
    templateUrl: './company-users.html',
    styleUrl: './company-users.scss'
})
export class CompanyUsers implements OnInit {
    openCompanyUser = false;
    showDepartments = false;

    companyUserList: any;
    userGroupList: any;
    departmentList: any;

    selectedDepartments: number[] = [];

    userId: number | null = null;

    private fb = inject(FormBuilder);

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    first = 0;
    offSet = 0;
    pageSize = 10;
    companyUserListLength = 0;

    actionName = 'Add';

    companyUserForm = this.fb.group({
        userId: [0],
        userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.maxLength(80), Validators.pattern(/^[a-zA-Z0-9._%+-]+$/)]],
        userGroupId: ['', Validators.required],
        userDepartments: this.fb.array([])
    });

    departmentsControl = new FormControl([]);

    assignDepartments(): FormGroup {
        return this.fb.group({
            departmentId: [0]
        });
    }

    ngOnInit(): void {
        this.fetchActiveCompanyUsers();
    }

    get userName() {
        return this.companyUserForm.get('userName');
    }

    get email() {
        return this.companyUserForm.get('email');
    }

    get userGroupId() {
        return this.companyUserForm.get('userGroupId');
    }

    get userDepartments() {
        return this.companyUserForm.get('userDepartments') as FormArray;
    }

    getMenuItems(user: any) {
        const items = [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => this.editUser(user)
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => this.deleteUser(user)
            }
        ];

        return user.isDefault ? items.filter((item: any) => item.label !== 'Delete') : items;
    }

    pageChange(event: any) {
        console.log(event);
        this.first = event.first;
        this.offSet = event.first / event.rows;
        this.pageSize = event.rows;
        this.fetchActiveCompanyUsers();
    }

    fetchActiveCompanyUsers() {
        try {
            let data = {
                offSet: this.offSet,
                pageSize: this.pageSize
            };
            this.apiService.fetchActiveCompanyUsers(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.companyUserList = val.data.data;
                    this.companyUserListLength = val.data.length;
                },
                error: (err) => {
                    console.log(err);

                    if (err.status === 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                    }
                }
            });
        } catch (error) {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Try Again!' });
        }
    }

    fetchActiveUserGroups() {
        try {
            this.apiService.fetchActiveUsergroup('').subscribe({
                next: (val) => {
                    console.log(val);
                    this.userGroupList = val.data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Try Again!' });
        }
    }

    fetchActiveDepartments() {
        try {
            this.apiService.fetchActiveDepartments('').subscribe({
                next: (val) => {
                    console.log(val);
                    this.departmentList = val.data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Try Again!' });
        }
    }

    selectedUserGroup(selectedGroupId: number) {
        this.showDepartments = selectedGroupId !== 301 && selectedGroupId !== 316;

        // if (!this.showDepartments) {
        //   this.userDepartments.clear();
        //   this.userDepartments.push(this.assignDepartments());
        // }
    }

    selectDepartments(selectedIds: number[]) {
        this.selectedDepartments = selectedIds;

        this.userDepartments.clear();

        selectedIds.forEach((id) => {
            this.userDepartments.push(
                this.fb.group({
                    departmentId: id
                })
            );
        });
        console.log('Form value:', this.companyUserForm.value);
    }

    addUser() {
        try {
            this.openCompanyUser = true;
            this.actionName = 'Add';
            this.fetchActiveUserGroups();
            this.fetchActiveDepartments();
        } catch (error) {
            console.log(error);
        }
    }

    fetchViewCompanyUser() {
        try {
            const data = {
                userId: this.userId
            };
            console.log(data);
            this.apiService.viewCompanyUser(data).subscribe({
                next: (val) => {
                    console.log(val);
                    const departmentIds = val.data.userDepartments.map((d: any) => d.departmentId);
                    this.departmentsControl.patchValue(departmentIds);

                    this.companyUserForm.patchValue(val.data);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    editUser(user: any) {
        // console.log(user);
        this.userId = user.userId;
        this.openCompanyUser = true;
        this.actionName = 'Update';
        this.fetchViewCompanyUser();
        this.fetchActiveUserGroups();
        this.fetchActiveDepartments();
        this.showDepartments = user.userGroupId !== 301;
        if (this.actionName === 'Update') {
            this.companyUserForm.get('email')?.disable();
        } else {
            this.companyUserForm.get('email')?.enable();
        }
        if (!this.showDepartments) {
            this.companyUserForm.get('userGroupId')?.disable();
        } else {
            this.companyUserForm.get('userGroupId')?.enable();
        }
    }

    onSubmit() {
        try {
            console.log(this.companyUserForm.value);
            if (this.actionName == 'Add') {
                let data = this.companyUserForm.value;
                this.apiService.createCompanyUsers(data).subscribe({
                    next: (res) => {
                        console.log(res);
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Created Successfully' });
                        this.openCompanyUser = false;
                        this.companyUserForm.reset();
                        this.userDepartments.clear();
                        this.departmentsControl.reset();
                        this.fetchActiveCompanyUsers();
                    },
                    error: (error) => {
                        console.log(error);
                    }
                });
            } else if (this.actionName == 'Update') {
                this.companyUserForm.get('email')?.enable();
                this.companyUserForm.get('userGroupId')?.enable();
                const data = { ...this.companyUserForm.value };
                this.companyUserForm.get('email')?.disable();
                this.companyUserForm.get('userGroupId')?.disable();

                if (!data.userDepartments?.length && this.showDepartments) {
                    const existingDepartments = this.departmentsControl.value?.map((id: number) => ({ departmentId: id }));
                    data.userDepartments = existingDepartments;
                }

                console.log(data);
                this.apiService.updateCompanyUser(data).subscribe({
                    next: (val) => {
                        console.log(val);
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Updated Successfully' });
                        this.openCompanyUser = false;
                        this.companyUserForm.reset();
                        this.departmentsControl.reset();
                        this.fetchActiveCompanyUsers();
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    deleteUser(user: any) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: `Delete ${user.userName}`,
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
                        userId: user.userId
                    };

                    this.apiService.deleteCompanyUser(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Deleted Successfully' });
                            this.fetchActiveCompanyUsers();
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
        this.userId = null;
        this.companyUserForm.reset();
        this.showDepartments = false;
        this.companyUserForm.get('email')?.enable();
        this.departmentsControl.reset();
    }
}
