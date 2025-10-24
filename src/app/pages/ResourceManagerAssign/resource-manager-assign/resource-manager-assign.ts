import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-resource-manager-assign',
  imports: [Shared],
  templateUrl: './resource-manager-assign.html',
  styleUrl: './resource-manager-assign.scss'
})
export class ResourceManagerAssign implements OnInit {
  selectedPCode:any = "";

  resourceManagerDemandList: any;
  resourceManagerList: any;

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

  roleList = [];

  
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
  departmentList:any = [
  {label:'O&M',id:1},
    {label:'BESS',id:2},
    {label:'Projects',id:3},
    {label:'QEHS',id:4},

 ]

 categoryList: any[] = [
  { label: 'Maintenance', id: 101 }, { label: 'Operations', id: 102 },
  { label: 'Battery Testing', id: 101 }, { label: 'BMS', id: 102 },
  { label: 'Fixed Cost Manpower Services', id: 101 }, { label: 'Cost Plus Manpower Services', id: 102 },
  { label: 'Quality', id: 101 }, { label: 'Safety', id: 102 },
 ];

  constructor(private fb: FormBuilder, private apiService: Apiservice, private messageService: MessageService) {}

  ngOnInit(): void {
    this.demandForm = this.fb.group({
      requisitionId: [{ value: 'MPT001', disabled: true }],
      pCode: [{ value: 'PCODE 1', disabled: true }, Validators.required],
      state: [{ value: 'Karnataka', disabled: true }, Validators.required],
      plannedDate: [{ value: '10-10-2025', disabled: true },],
      department: [{ value: 'Projects', disabled: true },],
      category: [{ value: 'Fixed Cost Manpower Services', disabled: true },],
      actualDate: [{ value: '09-10-2025', disabled: true },],
      durationDate: [{ value: '12-10-2025', disabled: true },],
      requestedBy: [{ value: 'ADMIN', disabled: true }],
     // spvArray: this.fb.array([])  // FormArray for dynamic rows
    });

    this.fetchDemandResourceManager();
    this.fetchResourceManagerList();
  }

  get spvArray(): FormArray {
    return this.demandForm.get('spvArray') as FormArray;
  }

  fetchDemandResourceManager(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      this.apiService.fetchDemandResourceManager(data).subscribe({
        next: val => {
          console.log(val);
          this.resourceManagerDemandList = val?.data.data;
        },
        error: err => {
          console.log(err);
        }
      })
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

  showDetailPopup(val:any){
    this.viewDetail = true;
  }
}
