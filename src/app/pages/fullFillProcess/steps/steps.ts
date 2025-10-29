import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps',
  imports: [Shared],
  templateUrl: './steps.html',
  styleUrl: './steps.scss'
})
export class Steps implements OnInit {
  offSet = 0;
  pageSize = 10;

  consultancyList: any;

  constructor(private apiService: Apiservice){}

  ngOnInit(): void {
    this.fetchActiveConsultancy();
  }

  fetchActiveConsultancy(){
    const data = {
      offSet: this.offSet,
      pageSize: this.pageSize
    }

    this.apiService.fetchActiveConsultancy(data).subscribe({
      next: val => {
        console.log(val);
        this.consultancyList = val.data.data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
