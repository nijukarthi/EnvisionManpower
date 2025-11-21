import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

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

  attendanceList: any;

  constructor(private apiService: Apiservice){}

  ngOnInit(): void {
      this.fetchAttendanceList();
  }

  fetchAttendanceList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }
      console.log(data);
      
      this.apiService.fetchCandidateSitePerformance(data).subscribe({
        next: val => {
          console.log(val);
          this.attendanceList = val.data.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
