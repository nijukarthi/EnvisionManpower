import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { TransferStatus } from '@/models/transfer-status/transfer-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    totalRecords = 0;
    selectedResignationId = 0;

    isEnabledBtn = false;
    resignationModal = false;

    currentUser = Number(sessionStorage.getItem('userGroupId'));

    resignationList: any;
    selectedResignDetails: any;

    selectedResignation: any[] = [];

    minDate: Date | undefined;

    private fb = inject(FormBuilder);

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

    updateResignationForm = this.fb.group({
        resignationId: [0],
        newLastWorkingDate: [''],
        reason: ['']
    })

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.fetchResignationList();

        const today = new Date();
        this.minDate = new Date(today);
    }

    get statuses(){
        return Object.entries(this.statusMap).map(([key, value]) => ({
            label: value.label,
            value: Number(key)
        }))
    }

    resignationApi(data: any){
        try {
            this.apiService.fetchResignationList(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.resignationList = val?.data?.data;
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

    fetchResignationList() {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                resignationStatuses: [102]
            };
            console.log(data);

            this.resignationApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    siteInchargeNDC(selectedValue: boolean, resignationId: number){
        console.log(selectedValue);

        const data = {
            resignationId: resignationId,
            updateNdc: selectedValue
        }

        console.log(data);

        this.apiService.siteInchargeNDC(data).subscribe({
            next: val => {
                console.log(val);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'NDC Updated Successfully' });
                this.fetchResignationList();
            },
            error: err => {
                console.log(err);

                if (err.status === 400) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                }
            }
        })
    }

    consultancyNDC(selectedValue: boolean, resignationId: number){
        const data = {
            resignationId: resignationId,
            updateNdc: selectedValue
        }

        console.log(data);

        this.apiService.consultancyNDC(data).subscribe({
            next: val => {
                console.log(val);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'NDC Updated Successfully' });
                this.fetchResignationList();
            },
            error: err => {
                console.log(err);

                if (err.status === 400) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                }
            }
        })
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
                    this.fetchResignationList();
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
                    this.fetchResignationList();
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
        this.selectedResignDetails = resignation;
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

    updateResignation(){
        try {
            this.resignationModal = true;

            this.updateResignationForm.patchValue({
                newLastWorkingDate: this.selectedResignDetails.lastWorkingDate,
                reason: this.selectedResignDetails.reason
            })
        } catch (error) {
            console.log(error);
        }
    }

    onSubmit(){
        try {
            const lastDate = this.updateResignationForm.get('newLastWorkingDate')?.value;

            const formatDate = this.datePipe.transform(lastDate, 'yyyy-MM-dd');

            this.updateResignationForm.patchValue({
                resignationId: this.selectedResignationId
            })

            const data = {
                ...this.updateResignationForm.value,
                newLastWorkingDate: formatDate
            };
            console.log(data);

            this.apiService.updateResignation(data).subscribe({
                next: val => {
                    console.log(val);
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Resignation Details Updated Successfully'});
                    this.resignationModal = false;
                    this.updateResignationForm.reset();
                    this.fetchResignationList();
                    this.selectedResignation = [];
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

    forceResignationPopup() {
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
                            this.fetchResignationList();
                            this.selectedResignation = [];
                        },
                        error: (err) => {
                            console.log(err);

                            if (err.status === 400) {
                              this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                              this.selectedResignation = [];
                            }
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

    cancelResignationPopup(){
      console.log('cancel request');
      this.confirmationService.confirm({
        header: 'Are you sure?',
        accept: () => {
          try {
            const data = {
              id: this.selectedResignationId
            }

            console.log(data);

            this.apiService.cancelResignation(data).subscribe({
              next: val => {
                console.log(val);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Resignation Cancelled Successfully' });
                this.fetchResignationList();
                this.selectedResignation = [];
              },
              error: err => {
                console.log(err);

                if (err.status === 400) {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                  this.selectedResignation = [];
                }
              }
            })
          } catch (error) {
            console.log(error);
          }
        },
        reject: () => this.isEnabledBtn = false
      })
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
                label: 'Edit Resignation',
                icon: 'pi pi-pencil',
                command: () => this.updateResignation()
            },
            {
                label: 'Force Resignation',
                icon: 'pi pi-bolt',
                command: () => this.forceResignationPopup()
            },
            {
                label: 'Cancel Resignation',
                icon: 'pi pi-times',
                command: () => this.cancelResignationPopup()
            }
        ];
    }

    getStatusLabel(status: number) {
        return this.statusMap[status]?.label ?? 'UnKnown';
    }

    getSeverity(status: number) {
        return this.statusMap[status]?.severity ?? 'primary';
    }

    updateRange(selectedValue: any, value: any[], index: number, filter: any){
        if(!value) value = [];

        value[index] = selectedValue;

        filter(value);
    }

    loadResignation(event: any){
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
                replacementRequired: filters?.replace?.[0]?.value ?? null,
                resignationStatuses: filters?.status?.[0]?.value ?? [102],
                lastWorkingFrom: Array.isArray(dateValue) ? formatDate(dateValue[0]) : null,
                lastWorkingTo: Array.isArray(dateValue) ? formatDate(dateValue[1]) : null
            }

            console.log(payload);

            this.resignationApi(payload);
        } catch (error) {
            console.log(error);
        }
    }

    onDialogClose(){
        this.updateResignationForm.reset();
        this.selectedResignation = [];
    }
}
