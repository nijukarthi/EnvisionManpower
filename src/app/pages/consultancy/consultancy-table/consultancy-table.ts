import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-consultancy-table',
    imports: [Shared],
    templateUrl: './consultancy-table.html',
    styleUrl: './consultancy-table.scss'
})
export class ConsultancyTable implements OnInit {
    consultancyList: any;

    consultancyId: any;
    openAddConsultancy: boolean = false;
    consultancyForm: any;
    filteredData: any;
    actionName: any = 'Add';

    currentUser = Number(sessionStorage.getItem('userGroupId'));

    currentUserEmail = sessionStorage.getItem('userEmail');

    USERGROUPS = UserGroups;

    offSet = 0;
    pageSize = 10;
    first = 0;
    totalRecords = 0;

    constructor(
        private apiService: Apiservice,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.fetchActiveConsultancy();
    }

    getMenuItems(consultancy: any) {
        return [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => this.router.navigate(['/home/consultancies', consultancy.userId, 'edit'])
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => this.deleteConsultancy(consultancy)
            }
        ];
    }

    consultancyApi(data: any){
        try {
            this.apiService.fetchActiveConsultancy(data).subscribe({
                next: (val) => {
                    this.consultancyList = val?.data.data;
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

    fetchActiveConsultancy() {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize
            };

            this.consultancyApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    deleteConsultancy(consultancy: any) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: `Delete ${consultancy.consultancyName}`,
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
                        userId: consultancy.userId
                    };

                    this.apiService.deleteConsultancy(data).subscribe({
                        next: (val) => {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Consultancy Deleted Successfully' });
                            this.fetchActiveConsultancy();
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

    exportToExcel(){
        const emailText = this.currentUserEmail ?? 'your email address';

        this.confirmationService.confirm({
            message: `The Excel file will be sent to ${emailText}. Do you want to proceed?`,
            header: 'Confirmation',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'OK'
            },
            accept: () => {
                try {
                    const data = {
                        ...this.filteredData,
                        export: true
                    };

                    this.apiService.fetchActiveConsultancy(data).subscribe({
                        next: (val) => {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Excel file successfully send to email' });
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    loadConsultancy(event: any){
        try {
            this.first = event.first;
            this.offSet = event.first / event.rows;
            this.pageSize = event.rows;

            const filters = event.filters;

            this.filteredData = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                consultancyCode: filters?.consultancyCode?.[0]?.value ?? '',
                consultancyName: filters?.consultancyName?.[0]?.value ?? ''
            }

            this.consultancyApi(this.filteredData);
        } catch (error) {
            console.log(error);
        }
    }
}
