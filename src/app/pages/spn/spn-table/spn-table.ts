import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Shared } from '@/service/shared';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Apiservice } from '@/service/apiservice/apiservice';
import { FormFieldError } from '@/directives/form-field-error';
import { UserGroups } from '@/models/usergroups/usergroups.enum';

@Component({
    selector: 'app-spn-table',
    imports: [TableModule, ButtonModule, Shared, ReactiveFormsModule, FormFieldError],
    templateUrl: './spn-table.html',
    styleUrl: './spn-table.scss'
})
export class SpnTable implements OnInit {
    openSpn = false;

    offSet = 0;
    pageSize = 10;
    first = 0;
    totalRecords = 0;
    filteredData: any;

    actionName = '';

    currentUser = Number(sessionStorage.getItem('userGroupId'));
        
    USERGROUPS = UserGroups;

    spnId: number | null = null;

    menuItems: any[] = [];

    spnList: any;
    selectedSpn: any;

    private fb = inject(FormBuilder);

    constructor(
        private apiService: Apiservice,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    spnForm = this.fb.group({
        spnId: [0],
        spnCode: ['', Validators.required],
        spnDescription: ['', Validators.required],
        experience: ['', Validators.required]
    });

    ngOnInit(): void {
        this.menuItems = this.getMenuItems();
        this.fetchActiveSpn();
    }

    experiences = [{ year: '0 year' }, { year: '3-5 years' }, { year: '5-8 years' }, { year: '6-8 years' }, { year: '8-10 years' }];

    get spnCode() {
        return this.spnForm.get('spnCode');
    }

    get spnDescription() {
        return this.spnForm.get('spnDescription');
    }

    get experience() {
        return this.spnForm.get('experience');
    }

    getMenuItems() {
        return [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => {
                    if (!this.selectedSpn) return;
                    this.editSpn(this.selectedSpn);
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    if (!this.selectedSpn) return;
                    this.deleteSpn(this.selectedSpn);
                }
            }
        ];
    }

    spnApi(data: any) {
        try {
            this.apiService.fetchActiveSpns(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.spnList = val?.data.data;
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

    addSpn() {
        try {
            this.openSpn = true;
            this.actionName = 'Save';
        } catch (error) {
            console.log(error);
        }
    }

    fetchActiveSpn() {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize
            };

            this.spnApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    editSpn(spn: any) {
        try {
            this.spnId = spn.spnId;
            this.openSpn = true;
            this.actionName = 'Update';
            this.spnForm.patchValue({
                spnCode: spn.spnCode,
                spnDescription: spn.spnDescription,
                experience: spn.experience
            });
        } catch (error) {
            console.log(error);
        }
    }

    onSubmit() {
        try {
            console.log(this.spnForm.value);
            if (!this.spnId) {
                if (this.spnForm.valid) {
                    const payload = {
                        spnCode: this.spnForm.get('spnCode')?.value,
                        spnDescription: this.spnForm.get('spnDescription')?.value,
                        experience: this.spnForm.get('experience')?.value
                    };

                    this.apiService.createNewSpn(payload).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'SPN Created Successfully' });
                            this.openSpn = false;
                            this.spnForm.reset();
                            this.fetchActiveSpn();
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
                if (this.spnForm.valid) {
                    const payload = {
                        spnId: this.spnId,
                        spnCode: this.spnForm.get('spnCode')?.value,
                        spnDescription: this.spnForm.get('spnDescription')?.value,
                        experience: this.spnForm.get('experience')?.value
                    };

                    this.apiService.updateSpn(payload).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'SPN Updated Successfully' });
                            this.openSpn = false;
                            this.spnForm.reset();
                            this.fetchActiveSpn();
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
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Try Again' });
        }
    }

    deleteSpn(spn: any) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: `Delete ${spn.spnCode}`,
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
                        spnId: spn.spnId
                    };

                    this.apiService.deleteSpn(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'SPN deleted Successfully' });
                            this.fetchActiveSpn();
                        },
                        error: (err) => {
                            console.log(err);
                            if (err.status === 400) {
                                this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.detail}` });
                            }
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    spnMenu(event: Event, menu: any, spn: any) {
        this.selectedSpn = spn;
        menu.toggle(event);
    }

    pageChange(event: any) {
        try {
            this.first = event.first;
            this.offSet = event.first / event.rows;
            this.pageSize = event.rows;

            const filters = event.filters;
            console.log(filters);

            this.filteredData = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                spnCode: filters?.spnCode?.[0]?.value ?? null,
                spnDescription: filters?.spnDescription?.[0]?.value ?? null,
                experience: filters?.experience?.[0]?.value ?? null
            };

            console.log(this.filteredData);
            this.spnApi(this.filteredData);
        } catch (error) {
            console.log(error);
        }
    }

    onDialogClose() {
        this.spnId = null;
        this.spnForm.reset();
    }
}
