import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { TransferStatus } from '@/models/transfer-status/transfer-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-terminate',
    imports: [Shared],
    templateUrl: './terminate.html',
    styleUrl: './terminate.scss'
})
export class Terminate implements OnInit {
    offSet = 0;
    pageSize = 10;
    first = 0;
    resignationListLength = 0;
    selectedResignationId = 0;

    activeTab = 'processing';

    isEnabledBtn = false;

    resignationList: any;

    selectedResignation: any[] = [];

    APPROVALSTATUS = ApprovalStatus;
    USERGROUPS = UserGroups;

    statusMap: any = {
        102: { label: 'Processing', severity: 'warn' },
        108: { label: 'Scheduled', severity: 'primary' },
        200: { label: 'Completed', severity: 'success' },
        406: { label: 'Rejected', severity: 'danger' }
    };

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.fetchResignationList(102);
    }

    setActiveTab(tab: string, status: number) {
        this.activeTab = tab;
        console.log(this.activeTab);
        this.fetchResignationList(status);
    }

    fetchResignationList(status: number) {
        try {
            console.log(status);
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                resignationStatus: status
            };
            console.log(data);

            this.apiService.fetchResignationList(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.resignationList = val?.data?.data;
                    this.resignationListLength = val?.data?.length ?? 0;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    clusterHeadApproval(resignationId: number, type: 'Accepted' | 'Rejected') {
        try {
            const data = {
                resignationId: resignationId,
                approvalStatus: type === 'Accepted' ? ApprovalStatus.ACCEPTED : ApprovalStatus.REJECTED
            };

            console.log(data);

            this.apiService.approveResignClusterHead(data).subscribe({
                next: (val) => {
                    console.log(val);
                    if (type === 'Accepted') {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Resignation Request Accepted' });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Resignation Request Rejected' });
                    }
                    this.fetchResignationList(102);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    departmentHeadApproval(resignationId: number, type: 'Accepted' | 'Rejected') {
        try {
            const data = {
                resignationId: resignationId,
                approvalStatus: type === 'Accepted' ? ApprovalStatus.ACCEPTED : ApprovalStatus.REJECTED
            };
            console.log(data);

            this.apiService.approveResignDeptHead(data).subscribe({
                next: (val) => {
                    console.log(val);
                    if (type === 'Accepted') {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Resignation Request Accepted' });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Resignation Request Rejected' });
                    }
                    this.fetchResignationList(102);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    selectedEmployee(resignation: any) {
        console.log(resignation);

        if (resignation.resignationStatus === TransferStatus.SCHEDULED) {
            this.selectedResignationId = resignation.resignationId;
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Scheduled Resignation request can only be processed as force & cancel resignation' });
        }
    }

    unSelectedEmployee() {
        this.selectedResignationId = 0;
    }

    typedValue(event: any) {
        if (event.target.value === 'Confirm') {
            this.isEnabledBtn = true;
        } else {
            this.isEnabledBtn = false;
        }
    }

    resignConfirmPopup() {
        this.confirmationService.confirm({
            header: 'Are you sure?',
            accept: () => {
                try {
                    const data = {
                        id: this.selectedResignationId
                    };
                    console.log(data);
                    this.apiService.forceResignation(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee resigned Successfully' });
                            this.fetchResignationList(102);
                        },
                        error: (err) => {
                            console.log(err);
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.detail });
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            reject: () => {
                this.isEnabledBtn = false;
            }
        });
    }

    noDueClearanceList = [
        {
            label: 'Yes',
            value: true
        },
        {
            label: 'No',
            value: false
        }
    ];

    getMenuItems() {
        return [
            {
                label: 'Force Resignation',
                icon: 'pi pi-bolt',
                command: () => this.resignConfirmPopup()
            },
            {
                label: 'Cancel Resignation',
                icon: 'pi pi-times'
            }
        ];
    }

    getStatusLabel(status: number) {
        return this.statusMap[status]?.label ?? 'UnKnown';
    }

    getSeverity(status: number) {
        return this.statusMap[status]?.severity ?? 'primary';
    }

    pageChange(event: any) {
        this.first = event.first;
        this.offSet = event.first / event.rows;
        this.pageSize = event.rows;
        this.fetchResignationList(102);
    }
}
