import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-training-table',
    imports: [Shared],
    templateUrl: './training-table.html',
    styleUrl: './training-table.scss'
})
export class TrainingTable implements OnInit {
    @ViewChild('dt') dt!: Table;
    @ViewChild('excelInput') excelInput!: ElementRef<HTMLInputElement>;

    offSet = 0;
    pageSize = 10;
    first = 0;
    totalRecords = 0;

    trainingList: any;
    editingRow: any | null = null;
    filteredData: any;

    menuItems: MenuItem[] = [];

    currentUser = Number(sessionStorage.getItem('userGroupId'));
          
    USERGROUPS = UserGroups;

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

        this.menuItems = this.getMenuItems();
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
                    this.trainingApi(this.filteredData);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    importTraining(file: File){
        try {
            const formData = new FormData();
            formData.append('file', file);

            console.log(formData);

            this.apiService.importTraining(formData).subscribe({
                next: val => {
                    console.log(val);
                    this.fetchActiveTrainingList();
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Excel uploaded successfully' });
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

    exportTraining(){
        try {
            this.apiService.exportTraining().subscribe({
                next: (val: Blob) => {
                    console.log(val);
                    const url = window.URL.createObjectURL(val);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Training.xlsx`;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Training excel template downloaded successfully.' });
                },
                error: async(err) => {
                    console.log(err);

                    if (err.error instanceof Blob) {
                        const text = await err.error.text();
                        const json = JSON.parse(text);
                        this.messageService.add({severity: 'error', summary: 'Error', detail: json.detail || 'Something went wrong' });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail || 'Something went wrong' });
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    excelSelected(event: Event){
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if(!file) return;

        this.importTraining(file);

        input.value = '';
    }

    openExcelPicker(){
        this.excelInput.nativeElement.click();
    }

    updateRange(selectedValue: any, value: any[], index: number, filter: any) {
        if (!value) value = [];
        value[index] = selectedValue;
        filter(value);
    }

    getMenuItems(){
        return [
            {
                label: 'Template',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'Import',
                        icon: 'pi pi-upload',
                        command: () => this.openExcelPicker()
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-download',
                        command: () => this.exportTraining()
                    }
                ]
            }
        ]
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

            this.filteredData = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                candidateName: filters?.candidateName?.[0]?.value ?? null,
                phoneNumber: filters?.phoneNumber?.[0]?.value ?? null,
                employeeCode: filters?.employeeCode?.[0]?.value ?? null,
                candidateCode: filters.tempEMPCode?.[0]?.value ?? null,
                projectCode: filters.projectCode?.[0]?.value ?? null,
                categoryName: filters.categoryName?.[0]?.value ?? null,
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
            console.log(this.filteredData);

            this.trainingApi(this.filteredData);
        } catch (error) {
            console.log(error);
        }
    }

    editAttendanceRow(training: any) {
        if (this.editingRow && this.editingRow !== training) {
            this.dt.cancelRowEdit(this.editingRow);
        }

        this.editingRow = training;
        training.editing = true;
    }

    cancelEdit(training: any) {
        this.trainingApi(this.filteredData);
        this.dt.cancelRowEdit(training);
        this.editingRow = null;
    }
}
