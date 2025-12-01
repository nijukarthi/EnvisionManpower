import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-attendance-table',
  imports: [Shared],
  templateUrl: './attendance-table.html',
  styleUrl: './attendance-table.scss'
})
export class AttendanceTable implements OnInit {
  offSet = 0;
  pageSize = 10;
  first = 0;
  totalRecords = 0;
  month: number | null = null;
  year: number | null = null;

  attendanceList: any;

  date: Date = new Date();

  constructor(private apiService: Apiservice, private messageService: MessageService){}

  ngOnInit(): void {
      this.fetchAttendanceList();
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

  pageChange(event: any){
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    this.fetchAttendanceList();
  }
}
