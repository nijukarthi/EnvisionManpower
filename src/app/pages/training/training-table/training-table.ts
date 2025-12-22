import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-training-table',
    imports: [Shared],
    templateUrl: './training-table.html',
    styleUrl: './training-table.scss'
})
export class TrainingTable implements OnInit {
    offSet = 0;
    pageSize = 10;
    first = 0;

    trainingList: any;
    totalRecords = 0;

    trainingStatusList = [
        {
            label: 'Yes',
            value: true
        },
        {
            label: 'No',
            value: false
        }
    ];

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.fetchActiveTrainingList();
    }
    trainingApi(data: any) {
        try {
            this.apiService.fetchTrainingList(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.trainingList = val?.data?.data?.map((training: any) => ({
                        ...training,
                        gwoTraining: training.gwoTraining || {
                            trainingStatus: null,
                            windaId: null,
                            validFrom: null,
                            validTill: null
                        }
                    }));
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

    fetchActiveTrainingList() {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize
            };

            console.log(data);

            this.trainingApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    getTrainingStatus(value: boolean) {
        const status = this.trainingStatusList.find((item) => item.value === value);
        return status?.label || '-';
    }

    submitTrainingForm(training: any) {
        try {
            console.log(training);

            const data = {
                candidateId: training.candidateId,
                trainingStatus: training.gwoTraining.trainingStatus,
                windaId: training.gwoTraining.windaId,
                validFrom: training.gwoTraining.validFrom,
                validTill: training.gwoTraining.validTill
            };
            console.log(data);

            this.apiService.updateGwoTraining(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidate GWO Training Details Updated Successfully' });
                    this.fetchActiveTrainingList();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateRange(selectedValue: any, value: any[], index: number, filter: any) {
        if (!value) value = [];
        value[index] = selectedValue;
        filter(value);
    }

    loadTraining(event: any) {
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
            const validFrom = filters?.validFrom?.[0]?.value;
            const validTill = filters?.validTill?.[0]?.value;

            const payload = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                candidateName: filters?.candidateName?.[0]?.value ?? null,
                phoneNumber: filters?.phoneNumber?.[0]?.value ?? null,
                employeeCode: filters?.employeeCode?.[0]?.value ?? null,
                candidateCode: filters.tempEMPCode?.[0]?.value ?? null,
                projectCode: filters.projectCode?.[0]?.value ?? null,
                clusterName: filters.clusterName?.[0]?.value ?? null,
                envisionRoleName: filters.envisionRoleName?.[0]?.value ?? null,
                trainingStatus: filters?.status?.[0]?.value ?? null,
                windaId: filters?.winda?.[0]?.value ?? null,
                joiningDateFrom: Array.isArray(dateValue) ? formatDate(dateValue[0]) : null,
                joiningDateTo: Array.isArray(dateValue) ? formatDate(dateValue[1]) : null,
                validFromStart: Array.isArray(validFrom) ? formatDate(validFrom[0]) : null,
                validFromEnd: Array.isArray(validFrom) ? formatDate(validFrom[1]) : null,
                validTillStart: Array.isArray(validTill) ? formatDate(validTill[0]) : null,
                validTillEnd: Array.isArray(validTill) ? formatDate(validTill[1]) : null
            };
            console.log(payload);

            this.trainingApi(payload);
        } catch (error) {
            console.log(error);
        }
    }
}
