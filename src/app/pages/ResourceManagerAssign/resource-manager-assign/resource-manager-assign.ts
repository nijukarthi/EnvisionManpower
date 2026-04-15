import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-resource-manager-assign',
  imports: [Shared],
  templateUrl: './resource-manager-assign.html',
  styleUrl: './resource-manager-assign.scss'
})
export class ResourceManagerAssign implements OnInit {
  selectedPCode: any = "";

  resourceManagerDemandList: any;
  resourceManagerList: any;
  requisitionDetails: any;
  filteredData: any;

  offSet = 0;
  pageSize = 10;
  first = 0;
  totalRecords = 0;

  selectedState:any = "";

  roleList = [];
  selectedApprovalList:any = [];
  viewDetail:boolean = false;

  constructor(private apiService: Apiservice, private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchDemandResourceManager();
    this.fetchResourceManagerList();
  }

  resourceManagerAssignApi(data: any){
    try {
      this.apiService.fetchDemandResourceManager(data).subscribe({
        next: val => {
          console.log(val);
          this.resourceManagerDemandList = val?.data.data;
          this.totalRecords = val?.data.length ?? 0;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchDemandResourceManager(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      console.log(data);

      this.resourceManagerAssignApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  fetchResourceManagerList(){
    try {   
      const data = {
        userGroupId: UserGroups.RESOURCEMANAGER
      };
  
      this.apiService.findUserGroup(data).subscribe({
        next: val => {
          console.log(val);
          this.resourceManagerList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  selectedResourceManager(demandId: number, resourceManagerId: any){
    try {   
      console.log(resourceManagerId);
  
      const data = {
        demandId: demandId,
        resourceManager: resourceManagerId
      }
  
      this.apiService.assignResourceManager(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Resource Manager Successfully Assigned'});
          this.fetchDemandResourceManager();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  showDetailPopup(requesitionId: number){
    try {
      this.viewDetail = true;
      
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

  loadRMAssign(event: any){
    try {
      this.first = event.first;
      this.offSet = event.first / event.rows;
      this.pageSize = event.rows;

      const filters = event.filters;
      console.log(filters);

      this.filteredData = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        demandCode: filters?.demandCode?.[0]?.value ?? '',
        spnCode: filters?.spnCode?.[0]?.value ?? '',
        spnDescription: filters?.spnDescription?.[0].value ?? '',
        experience: filters?.experience?.[0].value ?? ''
      }

      console.log(this.filteredData);

      this.resourceManagerAssignApi(this.filteredData);
    } catch (error) {
      console.log(error);
    }
  }
}
