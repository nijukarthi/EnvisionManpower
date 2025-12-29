import { Column } from '@/models/table-column/table-column';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-on-roll-employees',
  imports: [Shared],
  templateUrl: './on-roll-employees.html',
  styleUrl: './on-roll-employees.scss'
})
export class OnRollEmployees implements OnInit {
  @ViewChild('dt') table!: Table
  offSet = 0;
  pageSize = 10;
  first = 0;
  totalRecords = 0;
  candidateId: number | null = null;

  cols!: Column[];

  statuses!: any[];

  openPpeDetails = false;

  onrollEmployeeList: any;
  onrollPpeDetails: any;

  private fb = inject(FormBuilder);

  ppeDetailsForm = this.fb.group({
    candidateId: [0],
    ppeDetails: this.fb.array([])
  })

  get ppeDetails(){
    return this.ppeDetailsForm.get('ppeDetails') as FormArray;
  }

  updatePpeDetails(ppe: any){
    return this.fb.group({
      ppeType: [ppe.ppeType],
      size: [ppe.size]
    })
  }

  constructor(private apiService: Apiservice, private messageService: MessageService) {}

  ppeTypeList = [
    {
      label: 'Safety Helmet',
      value: 'Safety Helmet'
    },
    {
      label: 'Safety Shoes',
      value: 'Safety Shoes'
    },
    {
      label: 'Safety harness belt',
      value: 'Safety harness belt'
    },
    {
      label: 'Uniform Tshirt',
      value: 'Uniform Tshirt'
    },
    {
      label: 'Uniform Pants',
      value: 'Uniform Pants'
    },
    {
      label: 'Reflective vest',
      value: 'Reflective vest'
    },
  ]

  ngOnInit(): void {
    this.fetchActiveOnrollEmployees();

    this.statuses = [
      { label: 'ACTIVE', value: 'ACTIVE' },
      { label: 'TRANSFERRED', value: 'TRANSFERRED' },
      { label: 'RESIGNED', value: 'RESIGNED' }
    ]
  }

  onrollEmployeeApi(data: any){
    try {   
      this.apiService.fetchOnRollCandidates(data).subscribe({
        next: val => {
          console.log(val);
          this.onrollEmployeeList = val?.data.data.map((onroll: any) => ({
            ...onroll,
            employmentDetails: {
              ...onroll.employmentDetails,
              expectedJoiningDate: onroll.employmentDetails.expectedJoiningDate ? 
                new Date(onroll.employmentDetails.expectedJoiningDate) : null,
              joiningDate: onroll.employmentDetails.joiningDate ? 
                new Date(onroll.employmentDetails.joiningDate) : null
            }
          }));
          this.totalRecords = val?.data.length ?? 0;
          console.log(this.totalRecords);

          this.cols = [
            { field: 'employeeCode', header: 'Employee Code', customExportHeader: 'Employee Code' },
            { field: 'candidateName', header: 'Employee Name' },
            { field: 'employmentDetails.project.projectCode', header: 'Project Code' },
            { field: 'employmentDetails.project.siteName', header: 'Site Name' },
            { field: 'employmentDetails.cluster.clusterName', header: 'Cluster Name'},
            { field: 'employmentDetails.spn.spnCode', header: 'SPN Code' },
            { field: 'employmentDetails.spn.spnDescription', header: 'SPN Description' },
            { field: 'employmentDetails.spn.experience', header: 'Experience' },
            { field: 'employmentDetails.envisionRole.roleName', header: 'Role'},
            { field: 'employmentDetails.expectedJoiningDate', header: 'Expected DOJ' },
            { field: 'employmentDetails.joiningDate', header: 'Actual DOJ' },
            { field: 'phoneNumber', header: 'Contact Number'},
            { field: 'alternativeNumber', header: 'Emergency Contact Number' },
            { field: 'uan', header: 'UAN'},
            { field: 'aadharNumber', header: 'Aadhar Number' },
          ]
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchActiveOnrollEmployees(){
    try {   
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }
      console.log(data);
      
      this.onrollEmployeeApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  getNestedValue(obj: any, path: string){
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) ?? '-';
  }

  exportToExcel() {
    const data = {
      offSet: 0,
      pageSize: this.totalRecords,
      export: true
    };

    this.apiService.fetchOnRollCandidates(data).subscribe({
      next: (val) => {
        console.log(val);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Excel file successfully send to email' });

      }
    });
  }

  updateOnrollDetails(onroll: any){
    try {
      const formatDate = (d: any) => {
        if (!d) return null;
        return typeof d === 'string' ? d : d.toLocaleDateString('en-CA');
      };

      const data = {
        employmentDetails: {
          employmentId: onroll.employmentDetails.employmentId,
          expectedJoiningDate: formatDate(onroll.employmentDetails.expectedJoiningDate),
          joiningDate: formatDate(onroll.employmentDetails.joiningDate)
        },
        phoneNumber: onroll.phoneNumber,
        alternativeNumber: onroll.alternativeNumber,
        uan: onroll.uan,
        aadharNumber: onroll.aadharNumber
      }

      console.log(data);

      this.apiService.updateOnboardCandidates(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Candidate Details Updated Successfully'});
          setTimeout(() => {
            this.fetchActiveOnrollEmployees();
          }, 1000);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  populatePpeDetails(){
    this.ppeDetails.clear();

    this.onrollPpeDetails.forEach((ppe: any) => {
      this.ppeDetails.push(this.updatePpeDetails(ppe))
    })
  }

  fetchPpeDetails(){
    try {
      const data = {
        candidateId: this.candidateId
      }
      console.log(data);

      this.apiService.fetchPpeDetails(data).subscribe({
        next: val => {
          console.log(val);
          this.onrollPpeDetails = val?.data;
          this.populatePpeDetails();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  ppeDetailsModal(onroll: any){
    try {
      this.openPpeDetails = true;
      this.candidateId = onroll.candidateId;

      if (onroll.ppeDetails.length > 0) {
        this.fetchPpeDetails();
      } else {
        this.ppeDetails.push(
          this.fb.group({
            ppeType: [''],
            size: ['']
          })
        )
      }
    } catch (error) {
      console.log(error);
    }
  }

  addPpe(){
    console.log('checking');
    const newPpeGroup = this.fb.group({
      ppeType: [''],
      size: ['']
    })

    this.ppeDetails.push(newPpeGroup);
  }

  submitPpeDetails(){
    try {
      const data = {
        candidateId: this.candidateId,
        ppeDetails: this.ppeDetails.value
      }

      console.log(data);

      this.apiService.updatePpeDetails(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Updated PPE Details'});
          this.openPpeDetails = false;
          this.fetchActiveOnrollEmployees();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  removePpeDetails(index: number){
    this.ppeDetails.removeAt(index);
  }

  loadDemands(event: any){
    try {
      this.first = event.first;
      this.offSet = event.first / event.rows;
      this.pageSize = event.rows;

      const filters = event.filters;
      console.log(filters);

      const formatDate = (d: any) => {
        if(!d) return null;
        return typeof d === 'string' ? d : d.toLocaleDateString('en-CA');
      }

      const dateValue = filters?.date?.[0]?.value;

      const payload = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        employeeCode: filters?.employeeCode?.[0]?.value ?? null,
        candidateCode: filters?.candidateCode?.[0]?.value ?? null,
        candidateName: filters?.candidateName?.[0]?.value ?? null,
        consultancyName: filters?.consultancyName?.[0]?.value ?? null,
        demandCode: filters?.demandCode?.[0]?.value ?? null,
        projectCode: filters?.projectCode?.[0]?.value ?? null,
        clusterName: filters?.clusterName?.[0]?.value ?? null,
        spnCode: filters?.spnCode?.[0]?.value ?? null,
        spnDescription: filters?.spnDescription?.[0]?.value ?? null,
        experience: filters?.experience?.[0]?.value ?? null,
        envisionRoleName: filters?.roleName?.[0]?.value ?? null,
        employmentStatuses: filters?.status?.[0]?.value ?? null,
        phoneNumber: filters?.phoneNumber?.[0]?.value ?? null,
        joiningDateFrom: Array.isArray(dateValue) ? formatDate(dateValue[0]) : null,
        joiningDateTo: Array.isArray(dateValue) ? formatDate(dateValue[1]) : null 
      }

      console.log(payload);

      this.onrollEmployeeApi(payload);
    } catch (error) {
      console.log(error);
    }
  }

  updateRange(selectedValue: any, value: any[], index: number, filter: any){
    if(!value) value = [];

    value[index] = selectedValue;

    filter(value);
  }

  getSeverity(status: string){
    switch(status){
      case 'ACTIVE':
        return 'primary';
      case 'TRANSFERRED':
        return 'warn';
      case 'RESIGNED':
        return 'danger';
      default:
        return 'primary';
    }
  }

  onDialogClose(){
    this.candidateId = null;
    this.ppeDetailsForm.reset();
    this.ppeDetails.clear();
    this.onrollPpeDetails = [];
  }
}
