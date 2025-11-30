import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-po-assign-table',
  imports: [Shared],
  templateUrl: './po-assign-table.html',
  styleUrl: './po-assign-table.scss'
})
export class PoAssignTable implements OnInit {
  poList: any; 

  offSet = 0;
  pageSize = 10;

  constructor(private apiService: Apiservice){}

  ngOnInit(): void {
    this.fetchPOList();
  }

  getMenuItems(po: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil'
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash'
      }
    ]
  }

  fetchPOList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      console.log(data);

      this.apiService.fetchPOList(data).subscribe({
        next: val => {
          console.log(val);
          this.poList = val?.data?.data;
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
