import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-invoice-disbursement',
    imports: [Shared],
    templateUrl: './invoice-disbursement.html',
    styleUrl: './invoice-disbursement.scss'
})
export class InvoiceDisbursement implements OnInit {
    offSet = 0;
    pageSize = 10;
    first = 0;
    selectedInvoiceId = 0;

    invoiceStatus = '';

    invoiceDisbursementList: any;
    totalRecords: any;

    statuses!: any[];
    menuItems: any[] = [];

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.fetchDisbursementList();
        this.menuItems = this.getMenuItems();

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
    }

    getMenuItems(){
        return [
            {
                label: 'Start Disbursement',
                icon: '',
                command: () => this.startDisbursement()
            }
        ]
    }

    invoiceDisbursementApi(data: any) {
        try {
            this.apiService.fetchDisbursementList(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.invoiceDisbursementList = val?.data?.data;
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

    fetchDisbursementList() {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize
            };

            console.log(data);
            this.invoiceDisbursementApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    selectedInvoice(invoice: any) {
        this.selectedInvoiceId = invoice.invoiceHeader.invoiceId;
        this.invoiceStatus = invoice.invoiceHeader.invoiceStatus;
        console.log(this.selectedInvoiceId);
    }

    unSelectedInvoice() {
        this.selectedInvoiceId = 0;
    }

    startDisbursement() {
        try {
            const data = {
                invoiceId: this.selectedInvoiceId
            };

            console.log(data);

            this.apiService.startDisbursementProcess(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Disbursement Process Started Successfully' });
                    setTimeout(() => {
                        this.fetchDisbursementList();
                        this.selectedInvoiceId = 0;
                    }, 1000);
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
        }
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

    loadDisbursement(event: any) {
        try {
            this.first = event.first;
            this.offSet = event.first / event.rows;
            this.pageSize = event.rows;

            const filters = event.filters;
            console.log(filters);

            const grandTotal = filters?.total?.[0]?.value;

            const payload = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                invoiceNumber: filters?.invoiceNumber?.[0]?.value ?? null,
                invoiceStatuses: filters?.status?.[0]?.value ?? null,
                poNumber: filters?.poNumber?.[0]?.value ?? null,
                minAmount: Array.isArray(grandTotal) ? grandTotal[0] : null,
                maxAmount: Array.isArray(grandTotal) ? grandTotal[1] : null
            };
            console.log(payload);
            this.invoiceDisbursementApi(payload);
        } catch (error) {
            console.log(error);
        }
    }
}
