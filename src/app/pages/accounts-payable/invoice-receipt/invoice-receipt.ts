import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-invoice-receipt',
    imports: [Shared],
    templateUrl: './invoice-receipt.html',
    styleUrl: './invoice-receipt.scss'
})
export class InvoiceReceipt implements OnInit {
    offSet = 0;
    pageSize = 10;
    first = 0;
    totalRecords = 0;
    invoiceId = 0;

    statuses!: any[];
    grnStatuses!: any[];
    invoiceStatus = '';
    activeTab = '0';

    openGRNModal = false;

    invoiceGRNList: any;

    minDate: Date | undefined;
    maxDate: Date | undefined;

    private fb = inject(FormBuilder);

    GRNProcessForm = this.fb.group({
        invoiceId: [0],
        recipient: ['']
    });

    completeGRNForm = this.fb.group({
        invoiceId: [0],
        grnNumber: [''],
        grnDoneDate: ['']
    });

    grnReverseForm = this.fb.group({
        invoiceId: [0],
        grnReverseNumber: [''],
        reverseReason: ['']
    });

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.fetchInvoiceGRNList();
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
        this.grnStatuses = [
            { label: 'PENDING', value: 'PENDING' },
            { label: 'COMPLETED', value: 'COMPLETED' },
            { label: 'REVERSED', value: 'REVERSED' }
        ];
    }

    grnApi(data: any) {
        try {
            this.apiService.invoiceGRNList(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.invoiceGRNList = val?.data?.data;
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

    fetchInvoiceGRNList() {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize
            };

            console.log(data);

            this.grnApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    openGRN(receipt: any) {
        try {
            this.openGRNModal = true;
            this.invoiceId = receipt.invoiceHeader.invoiceId;
            this.invoiceStatus = receipt.invoiceHeader.invoiceStatus;

            this.GRNProcessForm.get('recipient')?.reset();
            this.grnReverseForm.reset();

            if (receipt.recipient) {
                this.GRNProcessForm.patchValue({
                    recipient: receipt.recipient
                });

                this.GRNProcessForm.get('recipient')?.disable();
            } else {
                this.GRNProcessForm.get('recipient')?.enable();
            }

            if (receipt.grnReverseNumber) {
                this.grnReverseForm.patchValue({
                    grnReverseNumber: receipt.grnReverseNumber,
                    reverseReason: receipt.grnReverseReason
                });

                this.grnReverseForm.get('grnReverseNumber')?.disable();
                this.grnReverseForm.get('reverseReason')?.disable();
            } else {
                this.grnReverseForm.get('grnReverseNumber')?.enable();
                this.grnReverseForm.get('reverseReason')?.enable();
            }

            if (this.invoiceStatus === 'GRN_IN_PROCESS') {
                this.activeTab = '1';
            } else if (this.invoiceStatus === 'GRN_REVERSED') {
                this.activeTab = '2';
            } else {
                this.activeTab = '0';
            }
        } catch (error) {
            console.log(error);
        }
    }

    submitGRNProcess() {
        try {
            const data = {
                ...this.GRNProcessForm.value,
                invoiceId: this.invoiceId
            };
            console.log(data);

            this.apiService.startGRNProcess(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'GRN Process Started Successfully' });
                    this.openGRNModal = false;
                    this.fetchInvoiceGRNList();
                },
                error: (err) => {
                    console.log(err);

                    if (err.status == 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    submitCompleteGRN() {
        try {
            const data = {
                ...this.completeGRNForm.value,
                invoiceId: this.invoiceId
            };

            console.log(data);

            this.apiService.completeGRNProcess(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'GRN Process Completed Successfully' });
                    this.openGRNModal = false;
                    this.fetchInvoiceGRNList();
                },
                error: (err) => {
                    console.log(err);

                    if (err.status == 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    submitGRNReverse() {
        try {
            const data = {
                ...this.grnReverseForm.value,
                invoiceId: this.invoiceId
            };

            console.log(data);

            this.apiService.makeGRNReverse(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'GRN Process Reversed Successfully' });
                    this.openGRNModal = false;
                    this.fetchInvoiceGRNList();
                },
                error: (err) => {
                    console.log(err);

                    if (err.status == 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    getMenuItems(receipt: any) {
        return [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => this.router.navigate(['/home/invoice-submission', receipt.invoiceHeader.invoiceId])
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

    getGRNSeverity(status: string) {
        if (!status) return undefined;
        // const normalized = status.trim().toUpperCase();
        switch (status) {
            case 'PENDING':
                return 'warn';
            case 'COMPLETED':
                return 'success';
            case 'REVERSED':
                return 'primary';
            default:
                return null;
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

    loadGRN(event: any) {
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
            const grnDoneDateValue = filters?.grnDate?.[0]?.value;

            const payload = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                invoiceNumber: filters?.invoiceNumber?.[0]?.value ?? null,
                poNumber: filters?.poNumber?.[0]?.value ?? null,
                statuses: filters?.status?.[0]?.value ?? null,
                grnStatuses: filters?.grnStatuses?.[0]?.value ?? null,
                submittedOnFrom: Array.isArray(submittedDateValue) ? formatDate(submittedDateValue[0]) : null,
                submittedOnTo: Array.isArray(submittedDateValue) ? formatDate(submittedDateValue[1]) : null,
                year: filters?.year?.[0]?.value ?? null,
                month: filters?.month?.[0]?.value ?? null,
                invoiceDateFrom: Array.isArray(dateValue) ? formatDate(dateValue[0]) : null,
                invoiceDateTo: Array.isArray(dateValue) ? formatDate(dateValue[1]) : null,
                grnDateFrom: Array.isArray(grnDoneDateValue) ? formatDate(grnDoneDateValue[0]) : null,
                grnDateTo: Array.isArray(grnDoneDateValue) ? formatDate(grnDoneDateValue[1]) : null,
                grnNumber: filters?.grnNumber?.[0]?.value ?? null,
                recipient: filters?.recipient?.[0]?.value ?? null
            };
            console.log(payload);
            this.grnApi(payload);
        } catch (error) {
            console.log(error);
        }
    }
    pageChange(event: any) {
        this.first = event.first;
        this.offSet = event.first / event.rows;
        this.pageSize = event.rows;

        this.fetchInvoiceGRNList();
    }
}
