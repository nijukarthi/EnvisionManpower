import { Component, OnInit } from '@angular/core';
import { Shared } from '@/service/shared';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apiservice } from '@/service/apiservice/apiservice';
import { DemandStatus } from '@/models/demand-status/demand-status.enum';
import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-approval',
  imports: [Shared],
  templateUrl: './approval.html',
  styleUrl: './approval.scss'
})
export class Approval implements OnInit {
  selectedPCode:any = "";

  demandProcessingList: any;
  PCodeList: any;
  clusterList: any;
  departmentList:any;
  categoryList: any;
  clusterHeadList: any;
  siteInchargeList: any;
  departmentHeadList: any;

  USERGROUPS = UserGroups;
  DEMANDSTATUS = DemandStatus;
  APPROVALSTATUS = ApprovalStatus;
  
  loggedUserGroupId = Number(sessionStorage.getItem('userGroupId'));

  offSet = 0;
  pageSize = 10;

  PCode:any = [
    {name:'PCODE 1',id:1},
    {name:'PCODE 2',id:2},
    {name:'PCODE 3',id:3},
  ]

  states = [
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Bihar", value: "Bihar" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Meghalaya", value: "Meghalaya" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Tripura", value: "Tripura" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "West Bengal", value: "West Bengal" },
    { label: "Delhi", value: "Delhi" }
  ];
  selectedState:any = "";
  demandForm!: FormGroup;

  spn:any = [
    {name:'SPN 1',id:1},
    {name:'SPN 2',id:2},
    {name:'SPN 3',id:3},
  ]

  
 spnDesc: any = [
  { name: 'Fresher Hiring', id: 1 },
  { name: 'Project Admin Executive', id: 2 },
  { name: 'Project Admin Executive', id: 3 },
  { name: 'Projects QEHS Engineer', id: 4 },
  { name: 'Projects QEHS Engineer', id: 5 },
  { name: 'Projects QEHS Manager', id: 6 },
  { name: 'Project Civil Engineer', id: 7 },
  { name: 'Project Civil Engineer', id: 8 },
  { name: 'Projects Civil Manager', id: 9 },
  { name: 'Project Commissioning Engineer', id: 10 },
  { name: 'Project Commissioning Engineer', id: 11 },
  { name: 'Project Commissioning Manager', id: 12 },
  { name: 'Project Installation Engineer', id: 13 },
  { name: 'Project Installation Engineer', id: 14 },
  { name: 'Project Installation Manager', id: 15 },
  { name: 'Project Store Engineer', id: 16 },
  { name: 'Project Store Engineer', id: 17 },
  { name: 'Project Store Engineer', id: 18 },
  { name: 'Projects Tools Technician', id: 19 },
  { name: 'Projects Tools Technician', id: 20 },
  { name: 'Projects Tools Technician', id: 21 },
  { name: "Projects WRG Electrical Supervisor with 'C' Licence", id: 22 },
  { name: 'Projects WRG Electrical Supervisor/ Mech QC', id: 23 },
  { name: 'Projects Blade & FRP Repairs', id: 24 },
  { name: 'Projects Blade & FRP Repairs', id: 25 }
];

  exp:any = [
   { label: '0 Years', value: '0' },
  { label: '3-5 Years', value: '3-5' },
  { label: '5-8 Years', value: '5-8' },
  { label: '3-5 Years', value: '3-5' },
  { label: '5-8 Years', value: '5-8' },
  { label: '8-10 Years', value: '8-10' },
  { label: '3-5 Years', value: '3-5' },
  { label: '5-8 Years', value: '5-8' },
  { label: '8-10 Years', value: '8-10' },
  { label: '3-5 Years', value: '3-5' },
  { label: '5-8 Years', value: '5-8' },
  { label: '8-10 Years', value: '8-10' },
  { label: '3-5 Years', value: '3-5' },
  { label: '5-8 Years', value: '5-8' },
  { label: '8-10 Years', value: '8-10' },
  { label: '3-5 Years', value: '3-5' },
  { label: '5-8 Years', value: '5-8' },
  { label: '8-10 Years', value: '8-10' },
  { label: '3-5 Years', value: '3-5' },
  { label: '5-8 Years', value: '5-8' },
  { label: '8-10 Years', value: '8-10' },
  { label: '6-8 Years', value: '6-8' },
  { label: '8-10 Years', value: '8-10' },
  { label: '3-5 Years', value: '3-5' },
  { label: '5-8 Years', value: '5-8' }
 ]
 spvArrayList:any = [
  {
    id:1,
    spn:'SPN 1',
    spnDesc:'Project Admin Executive',
    exp:'3-5 Years',
    qty:2
  },
  {
    id:2,
    spn:'SPN 2',
    spnDesc:'Projects Civil Manager',
    exp:'5-8 Years',
    qty:8
  }
 ];
 selectedApprovalList:any = [];
 viewDetail:boolean = false;

  constructor(private fb: FormBuilder, private apiService: Apiservice, private messageService: MessageService) {}

  ngOnInit(): void {
    this.demandForm = this.fb.group({
      requesitionCode: [{ value: '', disabled: true }],
      projectId: [{ value: '', disabled: true }, Validators.required],
      cluster: this.fb.group({
        clusterId: [{ value: '', disabled: true }]
      }),
      clusterHead: this.fb.group({
        userId: [{ value: '', disabled: true }]
      }),
      category: this.fb.group({
        categoryId: [{ value: '', disabled: true }]
      }),
      department: this.fb.group({
        departmentId: [{ value: '', disabled: true }]
      }),
      departmentHead: this.fb.group({
        userId: [{ value: '', disabled: true }]
      }),
      requestedBy: this.fb.group({
        userName: [{ value: '', disabled: true }]
      }),
      siteIncharge: this.fb.group({
        userId: [{ value: '', disabled: true }]
      })
    });

    this.fetchDemandRequest();
  }

  get spvArray(): FormArray {
    return this.demandForm.get('spvArray') as FormArray;
  }

  pageChange(event: any){
    console.log(event);
    this.offSet = event.first;
    this.pageSize = event.rows;
    this.fetchDemandRequest();
  }

  fetchDemandRequest(){
    try {
      const data = {
        demandStatus: DemandStatus.PROCESSING,
        offSet: this.offSet,
        pageSize: this.pageSize
      }
  
      this.apiService.fetchDemandRequest(data).subscribe({
        next: val => {
          console.log(val);
          this.demandProcessingList = val?.data?.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  demandQtyChange(demandId: number, quantity: number){
    try {  
      console.log(quantity);
  
      const data = {
        demandId: demandId,
        quantity: quantity
      }
  
      this.apiService.editDemandQuantity(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Demand Quantity Updated Successfully'});
          this.fetchDemandRequest();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  clusterHeadApproval(demandId: number, type: 'Accepted' | 'Rejected'){
    try {
      console.log(demandId);

      const data = {
        demandId: demandId,
        approvalStatus: type === 'Accepted' ? 200 : 406
      }

      this.apiService.approveDemandByClusterHead(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', 
            detail: type === 'Accepted' ? 'Demand Successfully Accepted' : 'Demand Rejected' });
          this.fetchDemandRequest();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  departmentHeadApproval(demandId: number, type: 'Accepted' | 'Rejected'){
    try {
      console.log(demandId);

      const data = {
        demandId: demandId,
        approvalStatus: type === 'Accepted' ? 200 : 406
      }

      this.apiService.approveDemandByDepartmentHead(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: type === 'Accepted' ? 
            'Demand Successfully Accepted' : 'Demand Rejected'});
          this.fetchDemandRequest();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  addSpvRow(): void {
    const spvGroup = this.fb.group({
      SPN: ['', Validators.required],
      SPNDesc: ['', Validators.required],
      experience: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]]
    });
    this.spvArray.push(spvGroup);
  }

  deleteSpvRow(index: number): void {
    this.spvArray.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.demandForm.value);
  }

  fetchPCodes(){
    try {   
      this.apiService.fetchProjectCodes('').subscribe({
        next: val => {
          console.log(val);
          this.PCodeList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchActiveDepartments(){
    try {    
      this.apiService.fetchActiveDepartments('').subscribe({
        next: val => {
          console.log(val);
          this.departmentList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchActiveClusters(){
    try {   
      this.apiService.getActiveClusters('').subscribe({
        next: val => {
          console.log(val);
          this.clusterList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }


  fetchActiveCategory(){
    try { 
      this.apiService.fetchActiveCategory('').subscribe({
        next: val => {
          console.log(val);
          this.categoryList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchClusterHeadByCluster(clusterId: number){
    console.log(clusterId);
    try {
      const data = {
        clusterId: clusterId
      }
      console.log(data);
      this.apiService.fetchClusterHeadByCluster(data).subscribe({
        next: val => {
          console.log(val);
          this.clusterHeadList = val.data ? [val.data] : [];
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  findUserGroup(userGroupId: number, type: 'siteIncharge' | 'departmentHead'){
    try {
      const data = {
        userGroupId: userGroupId
      }
      console.log(data);
      this.apiService.findUserGroup(data).subscribe({
        next: val => {
          console.log(val);
          if (type === 'siteIncharge') {
            this.siteInchargeList = val?.data;
            console.log("siteInchargeList:", this.siteInchargeList);
          } else if (type === 'departmentHead') {
            this.departmentHeadList = val?.data;
            console.log("departmentHeadList", this.departmentHeadList);
          }
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  showDetailPopup(requesitionId:number){
    try {
      this.viewDetail = true;
      this.fetchPCodes();
      this.fetchActiveClusters();
      this.fetchActiveDepartments();
      this.fetchActiveCategory();
      this.findUserGroup(UserGroups.SITEINCHARGE, 'siteIncharge');
      this.findUserGroup(UserGroups.DEPARTMENTHEAD, 'departmentHead');

      const data = {
        requesitionId: requesitionId
      }

      this.apiService.viewRequisition(data).subscribe({
        next: val => {
          console.log(val);
          this.fetchClusterHeadByCluster(val.data.cluster.clusterId);
          this.demandForm.patchValue(val.data);
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
