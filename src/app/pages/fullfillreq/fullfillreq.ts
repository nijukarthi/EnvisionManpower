import { Component, OnInit } from '@angular/core';
import { Shared } from '../../service/shared';
import { FormBuilder } from '@angular/forms';
import { Apiservice } from '@/service/apiservice/apiservice';
import { MessageService } from 'primeng/api';
import { UserGroups } from '@/models/usergroups/usergroups.enum';

@Component({
  selector: 'app-fullfillreq',
  imports: [Shared],
  templateUrl: './fullfillreq.html',
  styleUrl: './fullfillreq.scss'
})
export class Fullfillreq implements OnInit {
 selectedPCode:any = "";

 openRequisition = false;

 offSet = 0;
 pageSize = 10;
 first = 0;
 demandFullfillListLength = 0;

 UserGroups = UserGroups;

 demandFullfillList: any;
 envisionRoleList: any;
 requisitionDetails: any;

 loggedUserGroupId = Number(sessionStorage.getItem('userGroupId'));
  selectedState:any = "";

 roleList:any = [];
 manpowerList:any = [];

  constructor(private fb: FormBuilder, private apiService: Apiservice, private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchDemandFullFillment();
    this.fetchEnvisionRolesInfoList();
  }

  fetchDemandFullFillment(){
    try {    
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }
      console.log(data);
  
      this.apiService.assignRoleForDemand(data).subscribe({
        next: val => {
          console.log(val);
          this.demandFullfillList = val.data.data;
          this.demandFullfillListLength = val.data.length;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchEnvisionRolesInfoList(){
    try {  
      this.apiService.fetchRoleInfoList('').subscribe({
        next: val => {
          console.log(val);
          this.envisionRoleList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  assignEnvisionRoles(demandId: number, event: any){
    try {  
      console.log(demandId, event);
  
      const data = {
        demandId: demandId,
        envisionRoleId: event
      }
  
      this.apiService.assignEnvisionRoles(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Role Assigned Successfully'});
          this.fetchDemandFullFillment();
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Authenticated Resource Manager can only asssign role'});
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  showDetailPopup(requesitionId:number){
    try {
      this.openRequisition = true;

      const data = {
        requesitionId: requesitionId
      }

      this.apiService.viewRequisition(data).subscribe({
        next: val => {
          console.log(val);
          this.requisitionDetails = val.data;
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
    this.fetchDemandFullFillment();
  }

}
