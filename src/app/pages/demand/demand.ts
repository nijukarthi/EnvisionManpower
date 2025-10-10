import { Component } from '@angular/core';
import { Shared } from '@/service/shared';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demand',
  imports: [Shared],
  templateUrl: './demand.html',
  styleUrl: './demand.scss'
})
export class Demand {

  selectedPCode:any = "";

  PCode:any = [
    {name:'PCODE 1',id:1},
    {name:'PCODE 2',id:2},
    {name:'PCODE 3',id:3},
    {name:'PCODE 4',id:4},
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
    {label:'SPN 1',id:1},
    {label:'SPN 2',id:2},
    {label:'SPN 3',id:3},
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
   { label: '0 Years', value: '0 Years' },
  { label: '3-5 Years', value: '3-5 Years' },
  { label: '5-8 Years', value: '5-8 Years' },
  { label: '3-5 Years', value: '3-5 Years' },
  { label: '5-8 Years', value: '5-8 Years' },
  { label: '8-10 Years', value: '8-10 Years' },
  { label: '3-5 Years', value: '3-5 Years' },
  { label: '5-8 Years', value: '5-8 Years' },
  { label: '8-10 Years', value: '8-10 Years' },
  { label: '3-5 Years', value: '3-5 Years' },
  { label: '5-8 Years', value: '5-8 Years' },
  { label: '8-10 Years', value: '8-10 Years' },
  { label: '3-5 Years', value: '3-5 Years' },
  { label: '5-8 Years', value: '5-8 Years' },
  { label: '8-10 Years', value: '8-10 Years' },
  { label: '3-5 Years', value: '3-5 Years' },
  { label: '5-8 Years', value: '5-8 Years' },
  { label: '8-10 Years', value: '8-10 Years' },
  { label: '3-5 Years', value: '3-5 Years' },
  { label: '5-8 Years', value: '5-8 Years' },
  { label: '8-10 Years', value: '8-10 Years' },
  { label: '6-8 Years', value: '6-8 Years' },
  { label: '8-10 Years', value: '8-10 Years' },
  { label: '3-5 Years', value: '3-5 Years' },
  { label: '5-8 Years', value: '5-8 Years' }
 ]

 departmentList:any = [
  {label:'O&M',id:1},
    {label:'BESS',id:2},
    {label:'Projects',id:3},
    {label:'QEHS',id:4},

 ]

 categoryList: any[] = [ { label: 'Fixed Cost Manpower Services', id: 301 }, { label: 'Cost Plus Manpower Services', id: 302 } ];
 private categoriesByDept: Record<number, any[]> = {
    1: [ { label: 'Maintenance', id: 101 }, { label: 'Operations', id: 102 } ],
    2: [ { label: 'Battery Testing', id: 201 }, { label: 'BMS', id: 202 } ],
    3: [ { label: 'Fixed Cost Manpower Services', id: 301 }, { label: 'Cost Plus Manpower Services', id: 302 } ],
    4: [ { label: 'Quality', id: 401 }, { label: 'Safety', id: 402 } ]
  };
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.demandForm = this.fb.group({
     // requisitionId: [''],
      pCode: [null, Validators.required],
      state: [null, Validators.required],
      department: [null, Validators.required],
      category: [null, Validators.required],
      /* plannedDate: [null],
      actualDate: [null],
      durationDate: [null], */
      requestedBy: [{ value: 'ADMIN', disabled: true }],
      spnArray: this.fb.array([])  // FormArray for dynamic rows
    });
  }

  get spnArray(): FormArray {
    return this.demandForm.get('spnArray') as FormArray;
  }

  pcodeStateList:{[key:string]:string} = {
    "PCODE 1":"Karnataka",
    "PCODE 2":"Tamil Nadu",
    "PCODE 3":"Kerala"
  }

  spnDescList:{[key:string]:string} = {
    "SPN 1":"Fresher Hiring",
    "SPN 2":"Project Admin Executive",
    "SPN 3":"Projects QEHS Engineer",
  }

  spnListforDesc:{[key:string]:string} = {
    "Fresher Hiring":"SPN 1",
    "Project Admin Executive":"SPN 2",
    "Projects QEHS Engineer":"SPN 3",
  }

   spnExperienceList:{[key:string]:string} = {
    "SPN 1":"0 Years",
    "SPN 2":"3-5 Years",
    "SPN 3":"5-8 Years",
  }

  spnListforExp:{[key:string]:string} = {
    "Fresher Hiring":"0 Years",
    "Project Admin Executive":"3-5 Years",
    "Projects QEHS Engineer":"5-8 Years",
  }

  selectPCode(val:any){
    var pcode = val.value.name;
    var state = this.pcodeStateList[pcode];
    console.log(state);
    if(state){
      this.demandForm.get('state')?.patchValue(state);
      this.demandForm.get('state')?.disable();
    }else{
      this.demandForm.get('state')?.patchValue('');
      this.demandForm.get('state')?.enable();
    }
    
    
  }

   onDepartmentChange(val: any) {
    var id = val.value.id;
    if (id && this.categoriesByDept[id]) {
      this.categoryList = this.categoriesByDept[id];
    } else {
      this.categoryList = [];
    }
    // reset selected category whenever department changes
    //this.selectedCategoryId = undefined;
  }



  addSpnRow(): void {
    const spvGroup = this.fb.group({
      SPN: ['', Validators.required],
      SPNDesc: ['', Validators.required],
      experience: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      plannedDate: ['', Validators.required],
      actualDate: ['', Validators.required],
    });
    this.spnArray.push(spvGroup);
  }

  deleteSpnRow(index: number): void {
    this.spnArray.removeAt(index);
  }

  changeSPN(val:any,i:any){
    const selectedSPN = val.value; // the selected SPN label
    const spnInfo = this.spn.find((x:any) => x.label === selectedSPN);

    if (spnInfo) {
      this.spnArray.at(i).patchValue({
        SPNDesc: this.spnDescList[spnInfo.label],
        experience: this.spnExperienceList[spnInfo.label],
      });
    } else {
      this.spnArray.at(i).patchValue({ SPNDesc: '' });
    }
  }

  changeSPNDesc(val:any,i:any){
    const selectedSPN = val.value; // the selected SPN label
    const spnInfo = this.spnDesc.find((x:any) => x.name === selectedSPN);

    if (spnInfo) {
      this.spnArray.at(i).patchValue({
        SPN: this.spnListforDesc[spnInfo.name],
        experience: this.spnListforExp[spnInfo.name],
      });
    } else {
      this.spnArray.at(i).patchValue({ SPN: '' });
    }
  }
    
  

  onSubmit(): void {
    console.log(this.demandForm.value);
  }
}
