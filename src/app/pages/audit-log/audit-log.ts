import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audit-log',
  imports: [Shared],
  templateUrl: './audit-log.html',
  styleUrl: './audit-log.scss'
})
export class AuditLog implements OnInit {
  offSet = 0;
  pageSize = 10;
  first = 0;
  totalRecords = 0;

  logsList: any;

  constructor(private apiService: Apiservice){}

  ngOnInit(): void {
      this.fetchLogsList();
  }

  fetchLogsList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      console.log(data);

      this.apiService.logsList(data).subscribe({
        next: val => {
          console.log(val);
          this.logsList = val?.data?.data;
          this.totalRecords = val?.data?.length ?? 0;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  loadAuditLog(event: any){
    try {
      this.first = event.first;
      this.offSet = event.first / event.rows;
      this.pageSize = event.rows;

      const filters = event.filters;
      console.log(filters);

      
    } catch (error) {
      console.log(error);
    }
  }
}
