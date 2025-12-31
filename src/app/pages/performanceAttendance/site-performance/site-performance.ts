import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-site-performance',
  imports: [Shared],
  templateUrl: './site-performance.html',
  styleUrl: './site-performance.scss'
})
export class SitePerformance implements OnInit {
  @ViewChildren('scoreInput', { read: ElementRef })
    scoreInputs!: QueryList<ElementRef>;
  @ViewChild('dt') dt!: Table;
  @ViewChild('excelInput') excelInput!: ElementRef<HTMLInputElement>;

  openTerminateModal = false;

  offSet = 0;
  pageSize = 10;
  first = 0;
  totalRecords = 0;
  employmentId = 0;
  performanceColumnCount = 9;
  performanceColumns = Array.from({ length: this.performanceColumnCount });
  month: number | null = null;
  year: number | null = null;
  totalDays: number | null = null;

  sitePerformancesList: any;
  employeeDetails: any;
  statuses: any[] = [];
  selectedPerformances: any[] = [];
  editingRow: any | null = null;
  filteredData: any;

  date: Date = new Date();
  minDate: Date | undefined;

  currentUser = Number(sessionStorage.getItem('userGroupId'));
  currentUserEmail = sessionStorage.getItem('userEmail');

  USERGROUPS = UserGroups;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  resignationRequestForm = this.fb.group({
    resignationDetails: this.fb.array([this.resignEmployee()])
  })

  resignEmployee(){
    return this.fb.group({
      employmentId: [0],
      lastWorkingDate: [false],
      replacementRequired: [false]
    })
  }

  get resignationDetails(){
    return this.resignationRequestForm.get('resignationDetails') as FormArray;
  }
  
  constructor(private apiService: Apiservice, private messageService: MessageService,
    private confirmationService: ConfirmationService){}

  getMenuItems(){
    return [
      {
        label: 'Import',
        icon: 'pi pi-download',
        visible: this.currentUser === UserGroups.ADMIN || this.currentUser === UserGroups.RESOURCEMANAGER,
        command: () => this.openExcelPicker()
      },
      {
        label: 'Export to Excel',
        icon: 'pi pi-upload',
        command: () => this.exportToExcel()
      },
      {
        label: 'Transfer',
        icon: 'pi pi-file-export',
        disabled: !this.employeeDetails,
        command: () => this.router.navigate(['/home/transfer/update'], {
          state: {
            employeeDetails: this.employeeDetails
          }
        })
      },
      {
        label: 'Resignation',
        icon: 'pi pi-file-excel',
        disabled: !this.employeeDetails,
        command: () => this.resignateEmployee()
      }
    ]
  }

  isReplacement = [
    {
      label: 'Yes',
      value: true
    },
    {
      label: 'No',
      value: false
    }
  ]

  ngOnInit(): void {
    this.fetchCandidateSitePerformance();

    this.statuses = [
      { label: 'ACTIVE', value: 'ACTIVE' },
      { label: 'TRANSFERRED', value: 'TRANSFERRED' },
      { label: 'RESIGNED', value: 'RESIGNED' }
    ]

    const today = new Date();
    this.minDate = new Date(today);
  }

  performanceApi(data: any){
    try {
      this.apiService.fetchCandidateSitePerformance(data).subscribe({
        next: val => {
          console.log(val);
          this.sitePerformancesList = val?.data?.data;
          this.totalRecords = val?.data?.length ?? 0;

          this.sitePerformancesList = this.sitePerformancesList.map((p: any)=> ({
            ...p,
            employeePerformance: {
              ...p.employeePerformance,
              performanceDetails: p.employeePerformance.performanceDetails.map((detail: any) => ({
                ...detail,
                score: detail.score === 0 ? null : detail.score
              }))
            }
          }))
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
            this.sitePerformancesList = [];
            this.totalRecords = 0;
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  getDaysInMonth(month: number, year: number){
    return new Date(year, month, 0).getDate();
  }

  fetchCandidateSitePerformance(){
    try {
      this.month = this.date ? this.date.getMonth() + 1 : null;
      this.year = this.date ? this.date.getFullYear() : null;

      this.totalDays = this.month && this.year ? this.getDaysInMonth(this.month, this.year) : null;

      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        month: this.month,
        year: this.year
      }
      console.log(data);

      this.performanceApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  openExcelPicker(){
    this.excelInput.nativeElement.click();
  }

  excelSelected(event: Event){
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if(!file) return;

    this.importExcel(file);

    input.value = '';
  }

  importExcel(file: File){
    try {
      const payload = {
        month: this.month,
        year: this.year
      }

      console.log(payload);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('payload', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

      this.apiService.uploadSitePerformanceExcel(formData).subscribe({
        next: val => {
          console.log(val);
          this.fetchCandidateSitePerformance();

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Excel uploaded successfully'
          });
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

  exportToExcel(){
    const emailText = this.currentUserEmail ?? 'your email address';

    this.confirmationService.confirm({
      message: `The Excel file will be sent to ${emailText}. Do you want to proceed?`,
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label:'Cancel',
        severity:'secondary',
        outlined:true,
      },
      acceptButtonProps: {
        label:'OK',
      },
      accept:() => {
        try {
          const data = {
            ...this.filteredData,
            month: this.month,
            year: this.year,
            export: true
          };

          console.log(data);

          this.apiService.fetchCandidateSitePerformance(data).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Excel file successfully send to email' });
            }
          });

        } catch (error) {
          console.log(error);
        }
      }
    })  
  }

  getSeverity(status: string){
    switch(status){
      case 'ACTIVE':
        return 'primary';
      case 'TRANSFERRED':
        return 'warn';
      case 'RESIGNED':
        return 'danger';
      default: 
        return 'info';
    }
  }

  editPerformance(performance: any){
    if (this.editingRow && this.editingRow !== performance) {
      this.dt.cancelRowEdit(this.editingRow);
    }

    this.editingRow = performance;
    performance.editing = true;

    const details = performance.employeePerformance.performanceDetails;

    if (!details || details.length === 0) {
      performance.employeePerformance.performanceDetails = Array.from({ length: this.performanceColumnCount }, () => ({
        score: null
      }));
    }

    setTimeout(() => {
      const firstEmptyIndex = details.findIndex((d: any) => d.score === null);
      const inputs = this.scoreInputs.toArray();

      const target = inputs[firstEmptyIndex >= 0 ? firstEmptyIndex : 0];

      const nativeInput = target?.nativeElement.querySelector('input');

      nativeInput?.focus();
    });
  }

  cancelEdit(performance: any) {
    this.dt.cancelRowEdit(performance);
    this.editingRow = null;
  }

  calculateTotalScore(performance: any){
    const detail = performance.employeePerformance.performanceDetails;

    const total = detail.reduce((sum: number, item: any) => sum + (Number(item.score) || 0), 0);

    performance.employeePerformance.totalScore = total;

    performance.employeePerformance.remarks = 
      total >= 80 ? 'A' :
      total >= 60 ? 'B+' :
      total >= 40 ? 'B' :
      total >= 20 ? 'C' : 'D';
  }

  submitPerformanceForm(performance: any){
    try {
      console.log(performance);

      const data = {
        employmentId: performance.employmentDetails.employmentId,
        year: this.year,
        month: this.month,
        totalScore: performance.employeePerformance.totalScore,
        remarks: performance.employeePerformance.remarks,
        performanceDetails: performance.employeePerformance.performanceDetails
      }

      console.log(data);

      this.apiService.updateSitePerformanceDetails(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Updated Site Performance Details'});
          this.fetchCandidateSitePerformance();
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  resignateEmployee(){
    try {
      this.openTerminateModal = true;
      this.employmentId = this.employeeDetails.employmentId
    } catch (error) {
      console.log(error);
    }
  }

  selectedEmployee(performance: any){
    console.log(performance);
    this.employeeDetails = performance.employmentDetails;
    console.log(this.employeeDetails);
  }

  unSelectedEmployee(){
    this.employeeDetails = null;
    console.log(this.employeeDetails);
  }

  onSubmit(){
    try {    
      console.log(this.resignationRequestForm.value);
      this.resignationDetails.at(0).patchValue({
        ...this.resignationDetails.value,
        employmentId: this.employmentId
      })

      const data = this.resignationDetails.value;
      console.log(data);

      this.apiService.employeeResignation(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Resignation Request Created Successfully'});
          this.openTerminateModal = false;
          this.resignationRequestForm.reset();
          this.selectedPerformances = [];
          this.fetchCandidateSitePerformance();
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
            this.openTerminateModal = false;
            this.selectedPerformances = [];
            this.employeeDetails = null;
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  isAdminOrRM(): boolean {
    return this.currentUser === UserGroups.ADMIN || this.currentUser === UserGroups.RESOURCEMANAGER;
  }

  isSiteIncharge(){
    return this.currentUser === UserGroups.SITEINCHARGE;
  }

  siteInchargeAccess(){
    if(!this.date || this.totalDays === null) return false;

    const today = new Date();

    const isCurretMonth = today.getMonth() === this.date.getMonth() &&
      today.getFullYear() === this.date.getFullYear()

    if(!isCurretMonth) return false;

    const day = today.getDate();
    return day >=20 && day <= this.totalDays;
  }

  showEditBtn(){
    if (this.isAdminOrRM()) {
      return true;
    }

    if(this.isSiteIncharge()){
      return this.siteInchargeAccess()
    }

    return false;
  }

  isEditDisabled(performance: any, date: Date): boolean {
    const status = performance?.employmentDetails?.employmentStatus;
    const last = performance?.employmentDetails?.lastWorkingDate
      ? new Date(performance.employmentDetails.lastWorkingDate)
      : null;

    if (!last) return status !== 'ACTIVE';

    return status !== 'ACTIVE' && date > last;
  }

  replacementChange(isReplace: boolean){
    if (isReplace && !this.employeeDetails.demand) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Employment is not mapped to any demand. Create a new demand if replacement is required.'});
      this.resignationDetails.at(0).get('replacementRequired')?.setValue(false, { emitEvent: false });
      return;
    }
  }

  getFilterValues(filters: any, field: string): string[] | null{
    const rules = filters?.[field];
    if(!Array.isArray(rules)) return null;

    const values = rules
      .map(rule => rule?.value)
      .filter(v => v !== null && v !== '');

    return values.length ? values : null;
  }

  loadPerformances(event: any){
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

      this.filteredData = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        month: this.month,
        year: this.year,
        employeeCode: filters?.employeeCode?.[0]?.value ?? null,
        candidateCode: filters?.candidateCode?.[0]?.value ?? null,
        candidateName: filters?.candidateName?.[0]?.value ?? null,
        consultancyName: filters?.consultancyName?.[0]?.value ?? null,
        projectCode: this.getFilterValues(filters, 'projectCode'),
        clusterName: filters?.clusterName?.[0]?.value ?? null,
        spnCode: filters?.spnCode?.[0]?.value ?? null,
        spnDescription: filters?.spnDescription?.[0]?.value ?? null,
        experience: filters?.experience?.[0]?.value ?? null,
        envisionRoleName: filters?.roleName?.[0]?.value ?? null,
        phoneNumber: filters?.phoneNumber?.[0]?.value ?? null,
        employmentStatuses: filters?.status?.[0]?.value ?? null,
        joiningDateFrom: Array.isArray(dateValue) ? formatDate(dateValue[0]) : null,
        joiningDateTo: Array.isArray(dateValue) ? formatDate(dateValue[1]) : null
      }

      console.log(this.filteredData);

      this.performanceApi(this.filteredData);
    } catch (error) {
      console.log(error);
    }
  }

  updateRange(selectedValue: any, value: any[], index: number, filter: any){
    if(!value) value = [];

    value[index] = selectedValue;

    filter(value);
  }

  onDialogClose(){
    this.resignationRequestForm.reset();
  }
}
