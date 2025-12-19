import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-invoice-submission',
    imports: [Shared],
    templateUrl: './invoice-submission.html',
    styleUrl: './invoice-submission.scss'
})
export class InvoiceSubmission implements OnInit {
    offSet = 0;
    pageSize = 10;
    first = 0;
    totalRecords = 0;

    statuses!: any[];
    invoiceSubmissionList: any;

    minDate: Date | undefined;
    maxDate: Date | undefined;

    USERGROUPS = UserGroups;

    currentUserRole = Number(sessionStorage.getItem('userGroupId'));

    constructor(
        private apiService: Apiservice,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.fetchInvoiceSubmissionList();
        this.statuses = [
            { label: 'SUBMITTED', value: 'SUBMITTED' },
            { label: 'GRN_IN_PROCESS', value: 'GRN_IN_PROCESS' },
            { label: 'GRN_COMPLETED', value: 'GRN_COMPLETED' },
            { label: 'GRN_REVERSED', value: 'GRN_REVERSED' },
            { label: 'UNDER_DISBURSEMENT_REVIEW', value: 'UNDER_DISBURSEMENT_REVIEW' },
            { label: 'DISBURSEMENT_IN_PROGRESS', value: 'DISBURSEMENT_IN_PROGRESS' },
            { label: 'RETURNED_TO_GRN', value: 'RETURNED_TO_GRN' },
            { label: 'REJECTED', value: 'REJECTED' },
            { label: 'PAYMENT_APPROVED', value: 'PAYMENT_APPROVED' },
            { label: 'PAID', value: 'PAID' }
        ];

        const currentYear = new Date().getFullYear();

        this.minDate = new Date(currentYear, 0, 1);
        this.maxDate = new Date(currentYear, 11, 31);
    }

    invoiceSubmissionApi(data: any) {
        try {
            this.apiService.fetchInvoiceSubmissionList(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.invoiceSubmissionList = val?.data?.data;
                    this.totalRecords = val?.data?.length ?? 0;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    fetchInvoiceSubmissionList() {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize
            };

            console.log(data);
            this.invoiceSubmissionApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    getMenuItems(submission: any) {
        return [
            {
                label: 'View',
                icon: 'pi pi-eye',
                command: () => this.router.navigate(['/home/invoice-submission', submission.invoiceId])
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash'
            }
        ];
    }

    getSeverity(status: string) {
        switch (status) {
            case 'SUBMITTED':
                return 'primary';
            case 'GRN_IN_PROCESS':
                return 'primary';
            case 'GRN_COMPLETED':
                return 'success';
            case 'GRN_REVERSED':
                return 'warn';
            case 'UNDER_DISBURSEMENT_REVIEW':
                return 'info';
            case 'DISBURSEMENT_IN_PROGRESS':
                return 'primary';
            case 'RETURNED_TO_GRN':
                return 'info';
            case 'REJECTED':
                return 'danger';
            case 'PAYMENT_APPROVED':
                return 'success';
            case 'PAID':
                return 'success';
            default:
                return 'primary';
        }
    }
    updateRange(selectedValue: any, value: any[], index: number, filter: any) {
        if (!value) value = [];
        value[index] = selectedValue;
        filter(value);
    }

    filterByMonth(selectedDate: Date, filterCallback: Function) {
        if (!selectedDate) {
            filterCallback(null);
            return;
        }

        const month = selectedDate.getMonth() + 1;

        filterCallback(month);
    }

    filterByYear(selectedDate: Date, filterCallback: Function) {
        if (!selectedDate) {
            filterCallback(null);
            return;
        }

        const year = selectedDate.getFullYear();

        filterCallback(year);
    }

    loadInvoice(event: any) {
        try {
            this.first = event.first;
            this.offSet = event.first / event.rows;
            this.pageSize = event.rows;

            const filters = event.filters;
            console.log(filters);

            const formatDate = (d: any) => {
                if (!d) return null;
                return typeof d === 'string' ? d : d.toLocaleDateString('en-CA');
            };
            const dateValue = filters?.date?.[0]?.value;
            const submittedDateValue = filters?.submittedDate?.[0]?.value;

            const payload = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                invoiceNumber: filters?.invoiceNumber?.[0]?.value ?? null,
                statuses: filters?.status?.[0]?.value ?? null,
                submittedOnFrom: Array.isArray(submittedDateValue) ? formatDate(submittedDateValue[0]) : null,
                submittedOnTo: Array.isArray(submittedDateValue) ? formatDate(submittedDateValue[1]) : null,
                year: filters?.year?.[0]?.value ?? null,
                month: filters?.month?.[0]?.value ?? null,
                poNumber: filters?.poNumber?.[0]?.value ?? null,
                invoiceDateFrom: Array.isArray(dateValue) ? formatDate(dateValue[0]) : null,
                invoiceDateTo: Array.isArray(dateValue) ? formatDate(dateValue[1]) : null
            };
            console.log(payload);
            this.invoiceSubmissionApi(payload);
        } catch (error) {
            console.log(error);
        }
    }

    pageChange(event: any) {
        this.first = event.first;
        this.offSet = event.first / event.rows;
        this.pageSize = event.rows;
        this.fetchInvoiceSubmissionList();
    }
}
