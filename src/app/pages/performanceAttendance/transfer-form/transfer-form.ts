import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-form',
  imports: [Shared],
  templateUrl: './transfer-form.html',
  styleUrl: './transfer-form.scss'
})
export class TransferForm implements OnInit {
  pcodesList: any;
  constructor(private apiService: Apiservice){}

  ngOnInit(): void {
    this.fetchProjectCodes();
  }

  fetchProjectCodes(){
    this.apiService.fetchProjectCodes('').subscribe({
      next: val => {
        console.log(val);
        this.pcodesList = val.data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
