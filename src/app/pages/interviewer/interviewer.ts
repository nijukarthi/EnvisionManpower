import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormFieldError } from '@/directives/form-field-error';

@Component({
    selector: 'app-interviewer',
    imports: [Shared, FormFieldError],
    templateUrl: './interviewer.html',
    styleUrl: './interviewer.scss'
})
export class Interviewer implements OnInit {
    offSet = 0;
    pageSize = 10;
    userId: number | null = null;

    interviewerList: any;

    openInterviewer = false;

    actionName = 'Submit';

    private fb = inject(FormBuilder);

    interviewerForm = this.fb.group({
        userId: [0],
        userName: ['', [Validators.required, Validators.min(30), Validators.max(50)]],
        phoneNumber: ['', [Validators.required, Validators.min(10), Validators.max(10)]]
    });

    get userName() {
        return this.interviewerForm.get('userName');
    }

    get phoneNumber() {
        return this.interviewerForm.get('phoneNumber');
    }

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.fetchActiveInterviewers();
    }

    getMenuItems(interviewer: any) {
        return [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => this.editInterviewer(interviewer)
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => this.deleteInterviewer(interviewer)
            }
        ];
    }

    fetchActiveInterviewers() {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize
            };

            this.apiService.fetchActiveInterviewers(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.interviewerList = val.data.data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    addInterviewer() {
        try {
            this.openInterviewer = true;
        } catch (error) {
            console.log(error);
        }
    }

    onSubmit() {
        try {
            console.log(this.interviewerForm.value);
            if (!this.userId) {
                const { userId, ...data } = this.interviewerForm.value;
                console.log(data);

                this.apiService.createNewInterviewer(data).subscribe({
                    next: (val) => {
                        console.log(val);
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Interviewer Created Successfully' });
                        this.interviewerForm.reset();
                        this.openInterviewer = false;
                        this.fetchActiveInterviewers();
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
            } else {
                const data = this.interviewerForm.value;

                this.apiService.updateInterviewer(data).subscribe({
                    next: (val) => {
                        console.log(val);
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Interviewer Updated Successfully' });
                        this.interviewerForm.reset();
                        this.openInterviewer = false;
                        this.fetchActiveInterviewers();
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    fetchViewInterviewer() {
        try {
            const data = {
                userId: this.userId
            };
            this.apiService.fetchViewInterviewer(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.interviewerForm.patchValue(val.data);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    editInterviewer(candidate: any) {
        try {
            this.userId = candidate.userId;
            this.openInterviewer = true;
            this.actionName = 'Update';
            this.fetchViewInterviewer();
        } catch (error) {
            console.log(error);
        }
    }

    deleteInterviewer(candidate: any) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: `Delete ${candidate.userName}`,
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
                        userId: candidate.userId
                    };

                    this.apiService.deleteInterviewer(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: `${candidate.userName} Deleted Successfully` });
                            this.fetchActiveInterviewers();
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
        this.interviewerForm.reset();
    }
}
