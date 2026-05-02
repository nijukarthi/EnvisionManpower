import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
     visibleCount = 4;

    openDisbursementBooking = false;
    openPaymentApproving = false;
    openPaidMarking = false;
    openGRNReturning = false;
    expanded = false;

    invoiceStatus = '';

    currentUser = Number(sessionStorage.getItem('userGroupId'));
    
    USERGROUPS = UserGroups;

    invoiceDisbursementList: any;
    totalRecords: any;

    statuses!: any[];
    menuItems: any[] = [];
    selectedInvDisb: any[] = [];

    private fb = inject(FormBuilder);

    bookDisbursementForm = this.fb.group({
        invoiceId: [0],
        geoLocation: [''],
        wbs: [''],
        costProfitCenter: [''],
        dueDate: [''],
        bookedOn: ['']
    })

    approvePaymentForm = this.fb.group({
        invoiceId: [0],
        paymentDate: [''],
        paymentReferenceNo: ['']
    })

    grnReturnForm = this.fb.group({
        invoiceId: [0],
        reasonForReturn: ['']
    })

    paymentMarkedForm = this.fb.group({
        invoiceId: [0],
        paymentDate: [''],
        paymentReferenceNo: ['']
    })

    selectedStatuses: string[] = ['SUBMITTED', 'GRN_IN_PROCESS', 'GRN_COMPLETED', 
        'GRN_REVERSED', 'UNDER_DISBURSEMENT_REVIEW', 'DISBURSEMENT_IN_PROGRESS', 'RETURNED_TO_GRN',
        'REJECTED', 'PAYMENT_APPROVED', 'PAID'
    ];

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
                icon: 'pi pi-play',
                command: () => {
                    if (this.invoiceStatus !== 'UNDER_DISBURSEMENT_REVIEW') {
                        this.messageService.add({ 
                            severity: 'warn', 
                            summary: 'Action Not Allowed', 
                            detail: 'Invoice Status must be UNDER_DISBURSEMENT_REVIEW' 
                        });
                        return;
                    }
                    this.startDisbursement();
                }
            },
            {
                label: 'Book Disbursement',
                icon: 'pi pi-book',
                command: () => {
                    if (this.invoiceStatus !== 'DISBURSEMENT_IN_PROGRESS') {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Action Not Allowed',
                            detail: 'Invoice Status must be DISBURSEMENT_IN_PROGRESS'
                        });
                        return;
                    }
                    this.openBookDisbursement();
                }
            },
            {
                label: 'Approve Payment',
                icon: 'pi pi-money-bill',
                command: () => {
                    if (this.invoiceStatus !== 'DISBURSEMENT_IN_PROGRESS') {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Action Not Allowed',
                            detail: 'Invoice Status must be DISBURSEMENT_IN_PROGRESS'
                        });
                        return;
                    }
                    this.openPaymentApprove();
                }
            },
            {
                label: 'Return to GRN',
                icon: 'pi pi-undo',
                command: () => {
                    if (this.invoiceStatus !== 'UNDER_DISBURSEMENT_REVIEW') {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Action Not Allowed',
                            detail: 'Invoice Status must be UNDER_DISBURSEMENT_REVIEW'
                        });
                        return;
                    }
                    this.openGRNReturn();
                }
            },
            {
                label: 'Mark as Paid',
                icon: 'pi pi-verified',
                command: () => {
                    if (this.invoiceStatus !== 'PAYMENT_APPROVED') {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Action Not Allowed',
                            detail: 'Invoice Status must be PAYMENT_APPROVED'
                        });
                        return;
                    }
                    this.openPaymentMark();
                }
            }
        ]
    }

    invoiceDisbursementApi(data: any) {
        try {
            this.apiService.fetchDisbursementList(data).subscribe({
                next: (val) => {
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

            this.invoiceDisbursementApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    selectedInvoice(invoice: any) {
        this.selectedInvoiceId = invoice.invoiceHeader.invoiceId;
        this.invoiceStatus = invoice.invoiceHeader.invoiceStatus;
    }

    unSelectedInvoice() {
        this.selectedInvoiceId = 0;
    }

    startDisbursement() {
        try {
            const data = {
                invoiceId: this.selectedInvoiceId
            };

            this.apiService.startDisbursementProcess(data).subscribe({
                next: (val) => {
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

    openBookDisbursement(){
        try {
            this.openDisbursementBooking = true;
        } catch (error) {
            console.log(error);
        }
    }

    openPaymentApprove(){
        try {
            this.openPaymentApproving = true;
        } catch (error) {
            console.log(error);
        }
    }

    openGRNReturn(){
        try {
            this.openGRNReturning = true;
        } catch (error) {
            console.log(error);
        }
    }

    openPaymentMark(){
        try {
            this.openPaidMarking = true;
        } catch (error) {
            console.log(error);
        }
    }

    submitBookDisbursement(){
        try {
            const data = {
                ...this.bookDisbursementForm.value,
                invoiceId: this.selectedInvoiceId
            }

            this.apiService.bookDisbursement(data).subscribe({
                next: val => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invoice Under Disbursement Review' });
                    this.openDisbursementBooking = false;
                    this.bookDisbursementForm.reset();
                },
                error: err => {
                    console.log(err);

                    if (err.status === 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    submitPaymentApprove(){
        try {
            const data = {
                ...this.approvePaymentForm.value,
                invoiceId: this.selectedInvoiceId
            };

            this.apiService.approvePayment(data).subscribe({
                next: val => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Payment Approved Successfully' });
                    this.openPaymentApproving = false;
                    this.approvePaymentForm.reset();
                    this.fetchDisbursementList();
                    this.selectedInvDisb = [];
                },
                error: err => {
                    console.log(err);

                    if (err.status === 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                        this.selectedInvDisb = [];
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    submitReturnGRN(){
        try {
            const data = {
                ...this.grnReturnForm.value,
                invoiceId: this.selectedInvoiceId
            }

            this.apiService.returnGRN(data).subscribe({
                next: val => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'GRN Returned Successfully' });
                    this.openGRNReturning = false;
                    this.grnReturnForm.reset();
                    this.fetchDisbursementList();
                    this.selectedInvDisb = [];
                },
                error: err => {
                    console.log(err);

                    if (err.status === 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                        this.selectedInvDisb = [];
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    submitPaymentMarked(){
        try {
            const data = {
                ...this.paymentMarkedForm.value,
                invoiceId: this.selectedInvoiceId
            }

            this.apiService.paymentMarked(data).subscribe({
                next: val => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Payment Marked Successfully' });
                    this.openPaidMarking = false;
                    this.paymentMarkedForm.reset();
                    this.fetchDisbursementList();
                    this.selectedInvDisb = [];
                },
                error: err => {
                    console.log(err);

                    if (err.status === 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                        this.selectedInvDisb = [];
                    }
                }
            })
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

    getPaymentSeverity(status: string){
        if(!status) return undefined;
        
        switch (status){
            case 'NOT_INITIATED':
                return 'warn';
            case 'IN_PROGRESS':
                return 'primary';
            case 'COMPLETED':
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
            this.invoiceDisbursementApi(payload);
        } catch (error) {
            console.log(error);
        }
    }

    formatStatus(status: string) {
        return status.replace(/_/g, ' ').toLowerCase()
            .replace(/\b\w/g, c => c.toUpperCase());
    }

    statusGroups = [
        {
            label: 'GRN',
            items: ['GRN_IN_PROCESS', 'GRN_COMPLETED', 'GRN_REVERSED', 'RETURNED_TO_GRN']
        },
        {
            label: 'Disbursement',
            items: ['UNDER_DISBURSEMENT_REVIEW', 'DISBURSEMENT_IN_PROGRESS']
        },
        {
            label: 'Payment',
            items: ['PAYMENT_APPROVED', 'PAID']
        },
        {
            label: 'General',
            items: ['SUBMITTED', 'REJECTED']
        }
    ];

    hasSelectedStatus(group: any): boolean {
        return group.items.some((status: string) =>
            this.selectedStatuses.includes(status)
        );
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

    removeStatus(status: string, event?: Event) {
        // event?.stopPropagation();

        // this.selectedStatuses = this.selectedStatuses.filter(s => s !== status);

        // if (!this.selectedStatuses.length) {
        //     this.selectedStatuses = [102];
        // }

        // this.dt.filters['status'] = [{
        //     value: this.selectedStatuses,
        //     matchMode: 'in'
        // }];

        // this.dt._filter();
    }
}
