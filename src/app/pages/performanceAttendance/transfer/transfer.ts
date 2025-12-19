import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { TransferStatus } from '@/models/transfer-status/transfer-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-transfer',
    imports: [Shared],
    templateUrl: './transfer.html',
    styleUrl: './transfer.scss'
})
export class Transfer implements OnInit {
    offSet = 0;
    pageSize = 10;
    first = 0;
    transferredListLength = 0;
    selectedTransferId = 0;

    isEnableBtn = false;
    updateTransferModal = false;

    minDate: Date | undefined;
    minJoiningDate: Date | undefined;

    transferredEmployeeList: any;
    selectedTransferDetails: any;

    selectedTransfer: any[] = [];

    private fb = inject(FormBuilder);

    currentUserRole = Number(sessionStorage.getItem('userGroupId'));

    APPROVALSTATUS = ApprovalStatus;
    USERGROUPS = UserGroups;

    statusMap: Record<number, { label: string; severity: string }> = {
        102: { label: 'Processing', severity: 'warn' },
        108: { label: 'Scheduled', severity: 'primary' },
        200: { label: 'Completed', severity: 'success' },
        406: { label: 'Rejected', severity: 'danger' },
        418: { label: 'Cancelled', severity: 'danger' }
    };

    isReplacement = [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
    ]

    updateTransferForm = this.fb.group({
        transferId: [0],
        newLastWorkingDate: [''],
        newJoiningDate: [''],
        reason: ['']
    })

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.fetchTransferedList();

        const today = new Date();
        this.minDate = new Date(today);
    }

    get statuses(){
        return Object.entries(this.statusMap).map(([key, value]) => ({
            label: value.label,
            value: Number(key)
        }))
    }

    transferApi(data: any){
        try {
            this.apiService.fetchTransferredEmployeeList(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.transferredEmployeeList = val?.data?.data;
                    this.transferredListLength = val?.data?.length ?? 0;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    fetchTransferedList() {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                transferStatuses: [102]
            };
            
            this.transferApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    clusterHeadApproval(transferId: number, type: 'Accepted' | 'Rejected') {
        try {
            const data = {
                transferId: transferId,
                approvalStatus: type === 'Accepted' ? ApprovalStatus.ACCEPTED : ApprovalStatus.REJECTED
            };
            console.log(data);
            this.apiService.approveTransferClusterHead(data).subscribe({
                next: (val) => {
                    console.log(val);
                    if (type === 'Accepted') {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transfer Request Accepted Successfully' });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Transfer Request Rejected' });
                    }
                    this.fetchTransferedList();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    departmentHeadApproval(transferId: number, type: 'Accepted' | 'Rejected') {
        try {
            const data = {
                transferId: transferId,
                approvalStatus: type === 'Accepted' ? ApprovalStatus.ACCEPTED : ApprovalStatus.REJECTED
            };
            console.log(data);

            this.apiService.approveTransferDeptHead(data).subscribe({
                next: (val) => {
                    console.log(val);
                    if (type === 'Accepted') {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transfer Request Accepted Successfully' });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Transfer Request Rejected' });
                    }
                    this.fetchTransferedList();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    selectedEmployee(transfer: any) {
        console.log(transfer);
        this.selectedTransferDetails = transfer;
        if (transfer.transferStatus === TransferStatus.SCHEDULED) {
            this.selectedTransferId = transfer.transferId;
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', 
              detail: 'Scheduled transfer request can only be force & cancel transfer' });
        }
    }

    unSelectedEmployee() {
        this.selectedTransferId = 0;
    }

    updateTransfer(){
        try {
            this.updateTransferModal = true;

            this.updateTransferForm.patchValue({
                newLastWorkingDate: this.selectedTransferDetails.transferFrom.lastWorkingDate,
                newJoiningDate: this.selectedTransferDetails.joiningDate,
                reason: this.selectedTransferDetails.reason
            })
        } catch (error) {
            console.log(error);
        }
    }

    selectedLastDate(lastDate: Date){
        const nextDay = new Date(lastDate);
        nextDay.setDate(nextDay.getDate() + 1);

        this.minJoiningDate = nextDay;
        console.log(this.minJoiningDate);

        this.updateTransferForm.get('newJoiningDate')?.reset();
    }

    onSubmit(){
        try {
            this.updateTransferForm.patchValue({
                transferId: this.selectedTransferId
            })
            const data = this.updateTransferForm.value;

            console.log(data);

            this.apiService.updateTransfer(data).subscribe({
                next: val => {
                    console.log(val);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transfer Details Updated Successfully' });
                    this.updateTransferModal = false;
                    this.updateTransferForm.reset();
                    this.selectedTransfer = [];
                    this.fetchTransferedList();
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

    forceTransferPopup() {
        this.confirmationService.confirm({
            header: 'Are you sure?',
            accept: () => {
                try {
                    const data = {
                        id: this.selectedTransferId
                    };
                    console.log(data);
                    this.apiService.forceTransfer(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transfered Successfully' });
                            this.fetchTransferedList();
                            this.selectedTransfer = [];
                        },
                        error: (err) => {
                            console.log(err);

                            if (err.status === 400) {      
                              this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                              this.selectedTransfer = [];
                            }
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            reject: () => {
                this.isEnableBtn = false;
            }
        });
    }

    cancelTransferPopup(){
      console.log('cancel request');
      this.confirmationService.confirm({
        header: 'Are you sure?',
        accept: () => {
          try {
            const data = {
              id: this.selectedTransferId
            }
            console.log(data);

            this.apiService.cancelTransfer(data).subscribe({
              next: val => {
                console.log(val);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transfer Cancelled Successfully' });
                this.fetchTransferedList();
                this.selectedTransfer = [];
              },
              error: err => {
                console.log(err);

                if (err.status === 400) {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                  this.selectedTransfer = [];
                }
              }
            })
          } catch (error) {
            console.log(error);
          }
        },
        reject: () => this.isEnableBtn = false
      })
    }

    typedValue(event: any) {
        // console.log(event);

        if (event.target.value === 'Confirm') {
            this.isEnableBtn = true;
        } else {
            this.isEnableBtn = false;
        }
    }

    getMenuItems() {
        return [
            {
                label: 'Edit Transfer',
                icon: 'pi pi-pencil',
                command: () => this.updateTransfer()
            },
            {
                label: 'Force Transfer',
                icon: 'pi pi-bolt',
                command: () => this.forceTransferPopup()
            },
            {
                label: 'Cancel Transfer',
                icon: 'pi pi-times',
                command: () => this.cancelTransferPopup()
            }
        ];
    }

    getStatusLabel(status: number) {
        return this.statusMap[status]?.label ?? 'UnKnown';
    }

    getSeverity(status: number): string {
        return this.statusMap[status]?.severity ?? 'primary';
    }

    updateRange(selectedValue: any, value: any[], index: number, filter: any){
        if(!value) value = [];

        value[index] = selectedValue;

        filter(value);
    }

    loadTransfer(event: any){
        try {         
            this.first = event.first;
            this.offSet = event.first / event.rows;
            this.pageSize = event.rows;
    
            const filters = event.filters;
            console.log(filters);

            const formatDate = (d: any) => {
                if(!d) return null;
                return typeof d === 'string' ? d : d.toLocaleDateString('en-CA');
            }

            const dateValue = filters?.date?.[0]?.value;
    
            const payload = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                employeeCode: filters?.employeeCode?.[0]?.value ?? null,
                candidateName: filters?.candidateName?.[0]?.value ?? null,
                projectCode: filters?.projectCode?.[0]?.value ?? null,
                clusterName: filters?.clusterName?.[0]?.value ?? null,
                transferStatuses: filters?.status?.[0]?.value ?? [102],
                replacementRequired: filters?.replace?.[0]?.value ?? null,
                joiningFrom: Array.isArray(dateValue) ? formatDate(dateValue[0]) : null,
                joiningTo: Array.isArray(dateValue) ? formatDate(dateValue[1]) : null
            }
    
            console.log(payload);

            this.transferApi(payload);
        } catch (error) {
            console.log(error);
        }
    }

    onDialogClose(){
        this.updateTransferForm.reset();
        this.selectedTransfer = [];
    }
}
