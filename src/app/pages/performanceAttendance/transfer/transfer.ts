import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { TransferStatus } from '@/models/transfer-status/transfer-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
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

    transferredEmployeeList: any;

    selectedTransfer: any[] = [];
    statuses: any[] = [];

    currentUserRole = Number(sessionStorage.getItem('userGroupId'));

    APPROVALSTATUS = ApprovalStatus;
    USERGROUPS = UserGroups;

    statusMap: any = {
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

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.fetchTransferedList(102);

        this.statuses = [
            { label: 'Processing', value: 102 },
            { label: 'Scheduled', value: 108 },
            { label: 'Completed', value: 200 },
            { label: 'Rejected', value: 406 },
            { label: 'Cancelled', value: 418 }
        ]
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

    fetchTransferedList(status: number) {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                transferStatus: status
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
                    this.fetchTransferedList(102);
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
                    this.fetchTransferedList(102);
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
                            this.fetchTransferedList(102);
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
                this.fetchTransferedList(102);
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
                transferStatuses: filters?.status?.[0]?.value ?? null,
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
}
