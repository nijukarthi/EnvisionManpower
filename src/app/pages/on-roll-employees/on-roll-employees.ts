import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-roll-employees',
  imports: [Shared],
  templateUrl: './on-roll-employees.html',
  styleUrl: './on-roll-employees.scss'
})
export class OnRollEmployees implements OnInit {
  offSet = 0;
  pageSize = 10;
  first = 0;
  onrollEmployeeListLength = 0;

  onrollEmployeeList: any;

  constructor(private apiService: Apiservice) {}

  ngOnInit(): void {
    this.fetchActiveOnrollEmployees();
  }

  fetchActiveOnrollEmployees(){
    try {   
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }
      console.log(data);
      this.apiService.fetchOnRollCandidates(data).subscribe({
        next: val => {
          console.log(val);
          this.onrollEmployeeList = val?.data.data;
          this.onrollEmployeeListLength = val?.data.length ?? 0;
        },
        error: err => {
          console.log(err);
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
    this.fetchActiveOnrollEmployees();
  }
}
