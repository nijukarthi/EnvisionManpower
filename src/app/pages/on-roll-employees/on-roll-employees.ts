import { Column } from '@/models/table-column/table-column';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { catchError, concatMap, forkJoin, from, map, of, tap, throwError } from 'rxjs';

@Component({
    selector: 'app-on-roll-employees',
    imports: [Shared],
    templateUrl: './on-roll-employees.html',
    styleUrl: './on-roll-employees.scss'
})
export class OnRollEmployees implements OnInit {
    @ViewChild('dt') table!: Table;
    @ViewChild('excelInput') excelInput!: ElementRef<HTMLInputElement>;
    
    offSet = 0;
    pageSize = 10;
    first = 0;
    totalRecords = 0;
    candidateId: number | null = null;

    currentUser = Number(sessionStorage.getItem('userGroupId'));
      
    USERGROUPS = UserGroups;

    cols!: Column[];

    statuses!: any[];
    menuItems: any[] = [];
    consultancyRequestList: any[] = [];
    selectedOnroll: any[] = [];
    consultancyList: any[] = [];
 
    openPpeDetails = false;
    spnDetailsModal = false;
    showConsulRequestModal = false;

    onrollEmployeeList: any;
    onrollPpeDetails: any;
    filteredData: any;
    editingRow: any | null = null;
    spnInfoList: any;
    envisionRoleList: any;
    projectCodesList: any;
    onrollEmployeeDetails: any;

    selectedImportType!: 'FC' | 'CP';

    currentUserEmail = sessionStorage.getItem('userEmail');

    private fb = inject(FormBuilder);

    ppeDetailsForm = this.fb.group({
        candidateId: [0],
        ppeDetails: this.fb.array([])
    });

    get ppeDetails() {
        return this.ppeDetailsForm.get('ppeDetails') as FormArray;
    }

    updatePpeDetails(ppe: any) {
        return this.fb.group({
            ppeType: [ppe.ppeType],
            size: [ppe.size]
        });
    }

    updateEmploymentForm = this.fb.group({
        employmentId: [0],
        projectId: [0],
        spnId: [0],
        envisionRoleId: [0],
        joiningDate: [''],
        lastWorkingDate: [null],
        employmentStatus: ['']
    })

    consultancyChangeForm = this.fb.group({
        candidate: this.fb.group({
            candidateId: [0]
        }),
        consultancy: this.fb.group({
            userId: [0]
        })
    })

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ppeTypeList = [
        {
            label: 'Safety Helmet',
            value: 'Safety Helmet'
        },
        {
            label: 'Safety Shoes',
            value: 'Safety Shoes'
        },
        {
            label: 'Safety harness belt',
            value: 'Safety harness belt'
        },
        {
            label: 'Uniform Tshirt',
            value: 'Uniform Tshirt'
        },
        {
            label: 'Uniform Pants',
            value: 'Uniform Pants'
        },
        {
            label: 'Reflective vest',
            value: 'Reflective vest'
        }
    ];

    ngOnInit(): void {
        this.fetchActiveOnrollEmployees();

        this.statuses = [
            { label: 'ACTIVE', value: 'ACTIVE' },
            { label: 'TRANSFERRED', value: 'TRANSFERRED' },
            { label: 'RESIGNED', value: 'RESIGNED' }
        ];

        this.menuItems = this.getMenuItems();
    }

    onrollEmployeeApi(data: any) {
        try {
            this.apiService.fetchOnRollCandidates(data).subscribe({
                next: (val) => {
                    this.onrollEmployeeList = val?.data.data.map((onroll: any) => ({
                        ...onroll,
                        employmentDetails: {
                            ...onroll.employmentDetails,
                            expectedJoiningDate: onroll.employmentDetails.expectedJoiningDate ? new Date(onroll.employmentDetails.expectedJoiningDate) : null,
                            joiningDate: onroll.employmentDetails.joiningDate ? new Date(onroll.employmentDetails.joiningDate) : null
                        }
                    }));
                    this.totalRecords = val?.data.length ?? 0;

                    this.cols = [
                        { field: 'employeeCode', header: 'Employee Code', customExportHeader: 'Employee Code' },
                        { field: 'candidateName', header: 'Employee Name' },
                        { field: 'employmentDetails.project.projectCode', header: 'Project Code' },
                        { field: 'employmentDetails.project.siteName', header: 'Site Name' },
                        { field: 'employmentDetails.cluster.clusterName', header: 'Cluster Name' },
                        { field: 'employmentDetails.spn.spnCode', header: 'SPN Code' },
                        { field: 'employmentDetails.spn.spnDescription', header: 'SPN Description' },
                        { field: 'employmentDetails.spn.experience', header: 'Experience' },
                        { field: 'employmentDetails.envisionRole.roleName', header: 'Role' },
                        { field: 'employmentDetails.expectedJoiningDate', header: 'Expected DOJ' },
                        { field: 'employmentDetails.joiningDate', header: 'Actual DOJ' },
                        { field: 'phoneNumber', header: 'Contact Number' },
                        { field: 'alternativeNumber', header: 'Emergency Contact Number' },
                        { field: 'uan', header: 'UAN' },
                        { field: 'aadharNumber', header: 'Aadhar Number' }
                    ];
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    fetchActiveOnrollEmployees() {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                employmentStatuses: ['ACTIVE']
            };

            this.onrollEmployeeApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    getNestedValue(obj: any, path: string) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj) ?? '-';
    }

    exportToExcel() {
        const emailText = this.currentUserEmail ?? 'your email address';

        this.confirmationService.confirm({
            message: `The Excel file will be sent to ${emailText}. Do you want to proceed?`,
            header: 'Confirmation',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'OK'
            },
            accept: () => {
                try {
                    const data = {
                        ...this.filteredData,
                        export: true
                    };

                    this.apiService.fetchOnRollCandidates(data).subscribe({
                        next: (val) => {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Excel file successfully send to email' });
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    updateOnrollDetails(onroll: any) {
        try {
            const formatDate = (d: any) => {
                if (!d) return null;
                return typeof d === 'string' ? d : d.toLocaleDateString('en-CA');
            };

            const data = {
                employmentDetails: {
                    employmentId: onroll.employmentDetails.employmentId,
                    expectedJoiningDate: formatDate(onroll.employmentDetails.expectedJoiningDate),
                    joiningDate: formatDate(onroll.employmentDetails.joiningDate)
                },
                phoneNumber: onroll.phoneNumber,
                alternativeNumber: onroll.alternativeNumber
            };

            this.apiService.updateOnboardCandidates(data).subscribe({
                next: (val) => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidate Details Updated Successfully' });
                    setTimeout(() => {
                        this.onrollEmployeeApi(this.filteredData);
                    }, 1000);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    populatePpeDetails() {
        this.ppeDetails.clear();

        this.onrollPpeDetails.forEach((ppe: any) => {
            this.ppeDetails.push(this.updatePpeDetails(ppe));
        });
    }

    fetchPpeDetails() {
        try {
            const data = {
                candidateId: this.candidateId
            };

            this.apiService.fetchPpeDetails(data).subscribe({
                next: (val) => {
                    this.onrollPpeDetails = val?.data;
                    this.populatePpeDetails();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    ppeDetailsModal(onroll: any) {
        try {
            this.openPpeDetails = true;
            this.candidateId = onroll.candidateId;

            if (onroll.ppeDetails.length > 0) {
                this.fetchPpeDetails();
            } else {
                this.ppeDetails.push(
                    this.fb.group({
                        ppeType: [''],
                        size: ['']
                    })
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    addPpe() {
        const newPpeGroup = this.fb.group({
            ppeType: [''],
            size: ['']
        });

        this.ppeDetails.push(newPpeGroup);
    }

    submitPpeDetails() {
        try {
            const data = {
                candidateId: this.candidateId,
                ppeDetails: this.ppeDetails.value
            };

            this.apiService.updatePpeDetails(data).subscribe({
                next: (val) => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Updated PPE Details' });
                    this.openPpeDetails = false;
                    this.fetchActiveOnrollEmployees();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    removePpeDetails(index: number) {
        this.ppeDetails.removeAt(index);
    }

    getFilterValues(filters: any, field: string): string[] | null {
        const rules = filters?.[field];
        if (!Array.isArray(rules)) return null;

        const values = rules.map((rule) => rule?.value).filter((v) => v !== null && v !== '');

        return values.length ? values : null;
    }

    loadDemands(event: any) {
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

            this.filteredData = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                employeeCode: filters?.employeeCode?.[0]?.value ?? null,
                candidateCode: filters?.candidateCode?.[0]?.value ?? null,
                candidateName: filters?.candidateName?.[0]?.value ?? null,
                consultancyName: filters?.consultancyName?.[0]?.value ?? null,
                categoryName: filters?.categoryName?.[0]?.value ?? null,
                demandCode: filters?.demandCode?.[0]?.value ?? null,
                projectCode: this.getFilterValues(filters, 'projectCode'),
                siteInchargeName: filters?.siteInchargeName?.[0]?.value ?? null,
                clusterName: filters?.clusterName?.[0]?.value ?? null,
                spnCode: filters?.spnCode?.[0]?.value ?? null,
                spnDescription: filters?.spnDescription?.[0]?.value ?? null,
                experience: filters?.experience?.[0]?.value ?? null,
                envisionRoleName: filters?.roleName?.[0]?.value ?? null,
                employmentStatuses: filters?.status?.[0]?.value ?? ['ACTIVE'],
                phoneNumber: filters?.phoneNumber?.[0]?.value ?? null,
                joiningDateFrom: Array.isArray(dateValue) ? formatDate(dateValue[0]) : null,
                joiningDateTo: Array.isArray(dateValue) ? formatDate(dateValue[1]) : null
            };

            this.onrollEmployeeApi(this.filteredData);
        } catch (error) {
            console.log(error);
        }
    }

    updateRange(selectedValue: any, value: any[], index: number, filter: any) {
        if (!value) value = [];

        value[index] = selectedValue;

        filter(value);
    }

    getSeverity(status: string) {
        switch (status) {
            case 'ACTIVE':
                return 'primary';
            case 'TRANSFERRED':
                return 'warn';
            case 'RESIGNED':
                return 'danger';
            default:
                return 'primary';
        }
    }

    editOnrollRow(onroll: any) {
        if (this.editingRow && this.editingRow !== onroll) {
            this.table.cancelRowEdit(this.editingRow);
        }

        this.editingRow = onroll;
        onroll.editing = true;
    }

    cancelEdit(onroll: any) {
        this.onrollEmployeeApi(this.filteredData);
        this.table.cancelRowEdit(onroll);
        this.editingRow = null;
    }

    fetchSpnInfo(){
        try {
            this.apiService.fetchSpnInfo('').subscribe({
                next: val => {
                    this.spnInfoList = val?.data;
                },
                error: err => {
                    console.log(err);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    fetchRolesList(){
        try {
            this.apiService.fetchRoleInfoList('').subscribe({
                next: val => {
                    this.envisionRoleList = val?.data;
                },
                error: err => {
                    console.log(err);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    fetchProjectCodes(){
        try {
            this.apiService.fetchProjectCodes('').subscribe({
                next: val => {
                    this.projectCodesList = val?.data;
                },
                error: err => {
                    console.log(err);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    editSpnDetails(onroll: any){
        try {
            this.spnDetailsModal = true;
            this.onrollEmployeeDetails = onroll;
            this.fetchSpnInfo();
            this.fetchRolesList();
            this.fetchProjectCodes();

            const formatDate = (d: any) => {
                if (!d) return null;
                return typeof d === 'string' ? d : d.toLocaleDateString('en-CA');
            };

            this.updateEmploymentForm.patchValue({
                employmentId: onroll?.employmentDetails?.employmentId,
                projectId: onroll?.employmentDetails?.project?.projectId,
                spnId: onroll?.employmentDetails?.spn?.spnId,
                envisionRoleId: onroll?.employmentDetails?.envisionRole?.id,
                joiningDate: formatDate(onroll?.employmentDetails?.joiningDate),
                lastWorkingDate: onroll?.employmentDetails?.lastWorkingDate,
                employmentStatus: onroll?.employmentDetails?.employmentStatus
            })
        } catch (error) {
            console.log(error);
        }
    }

    selectedSpn(spnId: number){
        this.updateEmploymentForm.patchValue({
            ...this.updateEmploymentForm.value,
            spnId: spnId
        });

        const selectedSpn = this.spnInfoList.find(
            (spn: any) => spn.spnId === spnId
        );

        if (selectedSpn && this.onrollEmployeeDetails?.employmentDetails) {
            this.onrollEmployeeDetails.employmentDetails.spn = selectedSpn
        }
    }

    updateEmploymentDetails(){
        try {
            const data = this.updateEmploymentForm.value;

            this.apiService.updateEmploymentDetails(data).subscribe({
                next: val => {
                    this.messageService.add({ 
                        severity: 'success', 
                        summary: 'Success', 
                        detail: 'Employment Details Updated Successfully' });
                    this.spnDetailsModal = false;
                    this.fetchActiveOnrollEmployees();
                },
                error: err => {
                    console.log(err);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    importCostPlusCandidates(file: File){
        try {
            const formData = new FormData();
            formData.append('file', file);

            this.apiService.importCostPlusCandidates(formData).subscribe({
                next: val => {
                    this.fetchActiveOnrollEmployees();
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

    importFixedCostCandidates(file: File){
        try {
            const formData = new FormData();
            formData.append('file', file);

            this.apiService.importFixedCostCandidates(formData).subscribe({
                next: val => {
                    this.fetchActiveOnrollEmployees();
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

    exportFCCandidatesExcel(){
        try {
            this.apiService.exportFixedCostCandidates().subscribe({
                next: (val: Blob) => {
                    const url = window.URL.createObjectURL(val);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `FixedCostEmployee.xlsx`;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Fixed Cost Employees excel template downloaded successfully.' });
                },
                error: async(err) => {
                    console.log(err);

                    if(err.error instanceof Blob){
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

    exportCPCandidatesExcel(){
        try {
            this.apiService.exportCostPlusCandidates().subscribe({
                next: (val: Blob) => {
                    const url = window.URL.createObjectURL(val);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `CostPlusEmployee.xlsx`;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cost Plus Employees excel template downloaded successfully.' });
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

    fetchConsultancyList(){
        try {
            this.apiService.fetchConsultancyInfoList('').subscribe({
                next: val => {
                    console.log(val);
                    this.consultancyList = val.data;
                },
                error: err => {
                    console.log(err);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    get filteredConsultancyList() {
        const selectedIds = this.consultancyRequestList?.map(
            item => item.consultancy?.userId
        ) || [];

        return this.consultancyList.filter(
            consul => !selectedIds.includes(consul.userId)
        );
    }

    confirmConsultancyChange() {
        try {
            const selectedConsultancyId = this.consultancyChangeForm.get('consultancy.userId')?.value;

            if (!selectedConsultancyId) {
                console.log('Please select consultancy');
                return;
            }

            from(this.consultancyRequestList).pipe(
                concatMap(candidate => {
                    const payload = {
                        candidate: {
                            candidateId: candidate.candidateId
                        },
                        consultancy: {
                            userId: selectedConsultancyId
                        }
                    };

                    return this.apiService.createChangeConsulRequest(payload).pipe(
                        tap(() => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: `Request created for ${candidate.employeeCode}`
                            });

                            this.consultancyRequestList = this.consultancyRequestList.filter(
                                item => item.employmentDetails.employmentId !== candidate.employmentDetails.employmentId
                            );
                        }),
                        catchError(error => {
                            const errorMsg =
                                error?.error?.detail ||
                                'Something went wrong';

                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: `Failed for ${candidate.employeeCode} - ${errorMsg}`
                            });

                            return throwError(() => error);
                        })
                    );
                })
            ).subscribe({
                complete: () => {
                    this.consultancyChangeForm.reset();
                    this.showConsulRequestModal = false;
                },
                error: () => {
                    console.log('Execution stopped due to error');
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    removeSelectedEmployee(emp: any){
        console.log(emp);
        this.consultancyRequestList = this.consultancyRequestList.filter(
            item => item.employmentDetails.employmentId !== emp.employmentDetails.employmentId
        );
        console.log(this.consultancyRequestList);
    }

    selectedEmployee(onroll: any){
        console.log(onroll);
        const exists = this.consultancyRequestList.some(
            item => item.employmentDetails.employmentId === onroll.employmentDetails.employmentId
        )

        if(!exists){
            this.consultancyRequestList.push(onroll);
        }

        console.log(this.consultancyRequestList);
        this.menuItems = this.getMenuItems();
    }

    unSelectedEmployee(onroll: any){
        this.consultancyRequestList = this.consultancyRequestList.filter(
            item => item.employmentDetails.employmentId !== onroll.employmentDetails.employmentId
        );
        console.log(this.consultancyRequestList);
        this.menuItems = this.getMenuItems();
    }

    openExcelPicker(type: 'FC' | 'CP'){
        this.selectedImportType = type;
        this.excelInput.nativeElement.click();
    }

    excelSelected(event: Event){
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if(!file) return;

        if (this.selectedImportType === 'FC') {
            this.importFixedCostCandidates(file);
        } else {
            this.importCostPlusCandidates(file);
        }

        input.value = '';
    }

    openConsultancyRequest(){
        try {
            this.showConsulRequestModal = true;
            this.fetchConsultancyList();
        } catch (error) {
            console.log(error);
        }
    }

    getMenuItems(){
        return [
            {
                label: 'Template',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'Fixed Cost Employees',
                        icon: 'pi pi-wallet',
                        items: [
                            {
                                label: 'Import',
                                icon: 'pi pi-upload',
                                command: () => this.openExcelPicker('FC')
                            },
                            {
                                label: 'Export',
                                icon: 'pi pi-download',
                                command: () => this.exportFCCandidatesExcel()
                            }
                        ]
                    },
                    {
                        label: 'Cost Plus Employees',
                        icon: 'pi pi-receipt',
                        items: [
                            {
                                label: 'Import',
                                icon: 'pi pi-upload',
                                command: () => this.openExcelPicker('CP')
                            },
                            {
                                label: 'Export',
                                icon: 'pi pi-download',
                                command: () => this.exportCPCandidatesExcel()
                            }
                        ]
                    }
                ],
                visible: this.currentUser !== UserGroups.SERVICEMANAGER
            },
            {
                label: 'Export to Excel',
                icon: 'pi pi-external-link',
                command: () => this.exportToExcel()
            },
            {
                label: 'Change Consultancy Request',
                icon: 'pi pi-file-edit',
                disabled: this.consultancyRequestList.length === 0,
                command: () => this.openConsultancyRequest()
            }
        ]
    }

    onDialogClose() {
        this.candidateId = null;
        this.ppeDetailsForm.reset();
        this.ppeDetails.clear();
        this.onrollPpeDetails = [];
    }

    onConsulDialogClose(){
        this.consultancyRequestList = [];
        this.selectedOnroll = [];
    }

}
