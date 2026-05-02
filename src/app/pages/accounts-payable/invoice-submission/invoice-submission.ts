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
    visibleCount = 4;

    statuses!: any[];
    invoiceSubmissionList: any;

    minDate: Date | undefined;
    maxDate: Date | undefined;

    USERGROUPS = UserGroups;

    expanded = false;

    currentUserRole = Number(sessionStorage.getItem('userGroupId'));

    selectedStatuses: string[] = ['SUBMITTED', 'GRN_IN_PROCESS', 'GRN_COMPLETED', 
        'GRN_REVERSED', 'UNDER_DISBURSEMENT_REVIEW', 'DISBURSEMENT_IN_PROGRESS', 'RETURNED_TO_GRN',
        'REJECTED', 'PAYMENT_APPROVED', 'PAID'
    ];


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
                command: () => this.router.navigate(['/home/invoice-submission', submission.invoiceId, 'edit'])
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

            this.invoiceSubmissionApi(payload);
        } catch (error) {
            console.log(error);
        }
    }

    get remainingCount() {
        return this.selectedStatuses.length - this.visibleCount;
    }

    get visibleStatuses() {
        return this.expanded
            ? this.selectedStatuses
            : this.selectedStatuses.slice(0, 4);
    }

    toggleStatuses() {
        this.expanded = !this.expanded;
    }

    formatStatus(status: string) {
        return status.replace(/_/g, ' ').toLowerCase()
            .replace(/\b\w/g, c => c.toUpperCase());
    }

    removeStatus(status: string, event?: Event) {}
}
