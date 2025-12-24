import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-attendance-table',
  imports: [Shared],
  templateUrl: './attendance-table.html',
  styleUrl: './attendance-table.scss'
})
export class AttendanceTable implements OnInit {
  @ViewChild('totalWorkingDaysInput', { read: ElementRef }) totalWorkingDaysInput!: ElementRef;
  @ViewChild('presentDaysInput', { read: ElementRef }) presentDaysInput!: ElementRef;
  @ViewChild('weekOffInput', { read: ElementRef }) weekOffInput!: ElementRef;
  @ViewChild('paidLeavesInput', { read: ElementRef }) paidLeavesInput!: ElementRef;
  @ViewChild('absentDaysInput', { read: ElementRef }) absentDaysInput!: ElementRef;

  offSet = 0;
  pageSize = 10;
  first = 0;
  totalRecords = 0;
  month: number | null = null;
  year: number | null = null;

  attendanceList: any;
  statuses: any[] = [];

  USERGROUPS = UserGroups;

  currentUser = Number(sessionStorage.getItem('userGroupId'));

  date: Date = new Date();
  editingRow: any | null = null;
  @ViewChild('dt') dt!: Table;

  constructor(private apiService: Apiservice, private messageService: MessageService){}

  ngOnInit(): void {
      this.fetchAttendanceList();
      this.statuses = [
        { label: 'ACTIVE', value: 'ACTIVE' },
        { label: 'TRANSFERRED', value: 'TRANSFERRED' },
        { label: 'RESIGNED', value: 'RESIGNED' }
      ]
  }

  fetchAttendanceList(){
    try {
      this.month = this.date ? this.date.getMonth() + 1: null;
      this.year = this.date ? this.date.getFullYear() : null;

      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        month: this.month,
        year: this.year
      }
      console.log(data);
      
      this.attendanceApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  attendanceApi(data: any){
    try {
      this.apiService.fetchAttendanceList(data).subscribe({
        next: val => {
          console.log(val);
          this.attendanceList = val?.data?.data;
          this.totalRecords = val?.data?.length ?? 0;
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });

            this.attendanceList = [];
            this.totalRecords = 0;
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
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


  editAttendanceRow(attendance: any){
    if (this.editingRow && this.editingRow !== attendance) {
    this.dt.cancelRowEdit(this.editingRow);
  }

  this.editingRow = attendance;
  attendance.editing = true;
  setTimeout(() => {
    const fields = [
      { value: attendance.totalWorkingDays, ref: this.totalWorkingDaysInput },
      { value: attendance.presentDays, ref: this.presentDaysInput },
      { value: attendance.weekOff, ref: this.weekOffInput },
      { value: attendance.paidLeaves, ref: this.paidLeavesInput },
      { value: attendance.absentDays, ref: this.absentDaysInput }
    ];

    const target = fields.find(f => f.value === 0) || fields[0];
    target.ref?.nativeElement.querySelector('input')?.focus();
  });
  }

  cancelEdit(attendance: any) {
   this.dt.cancelRowEdit(attendance);
    this.editingRow = null;
}


// https://angular.dev/tools/cli/build#configuring-commonjs-dependencies
  submitAttendanceForm(attendance: any){
    try {
      console.log(attendance);

      const data = {
        employmentDetails: {
          employmentId: attendance.employmentDetails.employmentId
        },
        year: this.year,
        month: this.month,
        totalWorkingDays: attendance.totalWorkingDays,
        presentDays: attendance.presentDays,
        absentDays: attendance.absentDays,
        paidLeaves: attendance.paidLeaves,
        weekOff: attendance.weekOff
      }

      console.log(data);

      this.apiService.updateAttendanceDetails(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Updated Attendance Details'});
          this.fetchAttendanceList();
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail });
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  isEditDisabled(attendance: any, date: Date): boolean{
    const status = attendance?.employmentDetails?.employmentStatus;
    const last = attendance?.employmentDetails?.lastWorkingDate 
      ? new Date(attendance?.employmentDetails?.lastWorkingDate)
      : null;

    if (!last) return status !== 'ACTIVE';
    return status !== 'ACTIVE' && date > last;
  } 

  loadDemands(event: any){
    try {
      this.first = event.first;
      this.offSet = event.first / event.rows;
      this.pageSize = event.rows;

      const filters = event.filters;
      console.log(filters);

      const formatDate = (d: any) => {
        console.log(d);
        if (!d) return null;
        console.log(typeof d);
        console.log(d.toLocaleDateString('en-CA'));
        return typeof d === 'string' ? d : d.toLocaleDateString('en-CA');
      };

      const dateValue = filters?.date?.[0]?.value;

      const payload = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        month: this.month,
        year: this.year,
        employeeCode: filters?.employeeCode?.[0]?.value ?? null,
        candidateCode: filters?.candidateCode?.[0]?.value ?? null,
        candidateName: filters?.candidateName?.[0]?.value ?? null,
        consultancyName: filters?.consultancyName?.[0]?.value ?? null,
        projectCode: filters?.projectCode?.[0]?.value ?? null,
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

      console.log(payload);

      this.attendanceApi(payload);
    } catch (error) {
      console.log(error);
    }
  }

  updateRange(selectedValue: any, value: any[], index: number, filter: any){
    if(!value) value = [];

    value[index] = selectedValue;

    filter(value);
  }
}
