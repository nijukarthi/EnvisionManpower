import { Component, OnInit } from '@angular/core';
import { Shared } from '../../service/shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

 offSet = 0;
 pageSize = 10;

 UserGroups = UserGroups;

 demandFullfillList: any;
 envisionRoleList: any;

 loggedUserGroupId = Number(sessionStorage.getItem('userGroupId'));

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
 
 consultancyList:any = [
  {label:'List 1',id:1},
  {label:'List 2',id:2},
  {label:'List 3',id:3},
 ];
 tempEmpId:any = [
  {label:'TempId 1',id:1},
  {label:'TempId 2',id:2},
  {label:'TempId 3',id:3},
 ];
 statusList:any = [
  {label:'Approved',id:1},
  {label:'On-Hold',id:2},
  {label:'Rejected',id:3},
 ];
 acceptanceList:any = [
  {label:'Yes',id:1},
  {label:'No',id:2},
 ];

 roleList:any = [];
 manpowerList:any = [];

  constructor(private fb: FormBuilder, private apiService: Apiservice, private messageService: MessageService) {}

  ngOnInit(): void {
    this.demandForm = this.fb.group({
     
      requisitionId: [{ value: 'MPT001', disabled: true }],
      pCode: [{ value: 'PCODE 1', disabled: true }, Validators.required],
      state: [{ value: 'Karnataka', disabled: true }, Validators.required],
      plannedDate: [{ value: '10-10-2025', disabled: true },],
      actualDate: [{ value: '09-10-2025', disabled: true },],
      durationDate: [{ value: '12-10-2025', disabled: true },],
      requestedBy: [{ value: 'ADMIN', disabled: true }],
      role: [''],
      assignment: [''],
      consultancyName: [''],
      tempEmpId: [{ value: 'TEMP001', disabled: true }],
      candidateName: [''],
      designation: [''],
      finalInterview: [''],
      interviwer: [''],
      comments: [''],
      statusResource: [''],
      candidateAcceptance: [''],
      joiningDate: [''],
      PRNo: [''],
      PRDate: [''],
      PODate: [''],
      PONumber: [''],
      resourceJoining: [''],
      
        
    });

    this.fetchDemandFullFillment();
    this.fetchEnvisionRoles();
  }

  fetchDemandFullFillment(){
    try {    
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }
  
      this.apiService.fetchDemandFullFill(data).subscribe({
        next: val => {
          console.log(val);
          this.demandFullfillList = val.data.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchEnvisionRoles(){
    try {  
      this.apiService.fetchActiveEnvRole('').subscribe({
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

}
