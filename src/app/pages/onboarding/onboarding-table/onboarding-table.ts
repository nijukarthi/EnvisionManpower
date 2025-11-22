import { Column } from '@/models/table-column/table-column';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-onboarding-table',
  imports: [Shared],
  templateUrl: './onboarding-table.html',
  styleUrl: './onboarding-table.scss'
})
export class OnboardingTable implements OnInit {
  @ViewChild('dt') table!: Table;

  offSet = 0;
  pageSize = 10;
  onboardingListLength = 0;
  first = 0;
  candidateId: number | null = null;

  cols!: Column[];

  loading = false;
  openPpeModal = false;

  onboardingList: any;
  selectedCandidates: any[] = [];
  ppeDetailsList: any;

  private fb = inject(FormBuilder);

  constructor(private apiService: Apiservice, private messageService: MessageService){}

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

  ppeDetailsForm = this.fb.group({
    candidateId: [0],
    ppeDetails: this.fb.array([])
  })

  updatePpeDetails(ppe: any){
    return this.fb.group({
      ppeType: [ppe.ppeType],
      size: [ppe.size]
    })
  }

  get ppeDetails(){
    return this.ppeDetailsForm.get('ppeDetails') as FormArray;
  }

  addPpeDetail(){
    console.log('checking');
    const newPpeGroup = this.fb.group({
      ppeType: [''],
      size: ['']
    })
    
    this.ppeDetails.push(newPpeGroup);
  }

  ngOnInit(): void {
    this.fetchOnboardingCandidateList();
    console.log(this.onboardingListLength);
  }

  fetchOnboardingCandidateList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }
      console.log("sending data to backend:", data);
      this.loading = true;

      this.apiService.fetchOnboardingCandidateList(data).subscribe({
          next: (val) => {
            console.log(val);
            this.onboardingList = val?.data?.data.map((onboarding: any) => ({
              ...onboarding,
              employmentDetails: {
                ...onboarding.employmentDetails,
                expectedJoiningDate: onboarding.employmentDetails.expectedJoiningDate ? new Date(onboarding.employmentDetails.expectedJoiningDate) : null,
                joiningDate: onboarding.employmentDetails.joiningDate ? new Date(onboarding.employmentDetails.joiningDate) : null
              },
            }));
            this.onboardingListLength = val?.data?.length ?? 0;
            this.loading = false;

            this.cols = [
              { field: 'employeeCode', header: 'Employee Code', customExportHeader: 'Employee Code' },
              { field: 'candidateName', header: 'Employee Name' },
              { field: 'employmentDetails.project.projectCode', header: 'Project Code' },
              { field: 'employmentDetails.project.siteName', header: 'Site Name' },
              { field: 'employmentDetails.cluster.clusterName', header: 'Cluster Name' },
              { field: 'employmentDetails.envisionRole.roleName', header: 'Role' },
              { field: 'employmentDetails.expectedJoiningDate', header: 'Expected DOJ' },
              { field: 'employmentDetails.joiningDate', header: 'Actual DOJ' },
              { field: 'phoneNumber', header: 'Contact Number' },
              { field: 'alternativeNumber', header: 'Emergency Contact Number' },
              { field: 'uan', header: 'UAN' },
              { field: 'aadharNumber', header: 'Aadhar Number' }
            ]
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
      })
    } catch (error) {
      console.log(error);
    }
  }

  getNestedValue(obj: any, path: string){
    return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? '';
  }

  exportToExcel(){
    this.onboardingList.map((item: any) => {
      const obj: any = {};
      this.cols.forEach(col => {
        obj[col.header] = this.getNestedValue(item, col.field);
      });
      return obj;
    });
    this.table.exportCSV({ selectionOnly: false });
  }


  moveCandidateToOnroll(){
    const employmentIds = this.selectedCandidates.map((c: any) => c.employmentDetails.employmentId);
    console.log(employmentIds);

    const data = {
      ids: employmentIds
    }
    console.log(data);

    this.apiService.moveCandidatesToOnroll(data).subscribe({
      next: val => {
        console.log(val);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Moved Candidates to On-roll Employees'});
        this.selectedCandidates = [];
        setTimeout(() => {     
          this.fetchOnboardingCandidateList();
        }, 1000);
      },
      error: err => {
        console.log(err);

        if (err.status === 400) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
        }
      }
    })
  }

  fetchPpeDetails(){
    try {
      const data = {
        candidateId: this.candidateId
      }

      this.apiService.fetchPpeDetails(data).subscribe({
        next: val => {
          console.log(val);
          this.ppeDetailsList = val.data;
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

  populatePpeDetails(){
    const formArray = this.ppeDetails;
    formArray.clear();

    this.ppeDetailsList.forEach((ppe: any) => {
      formArray.push(this.updatePpeDetails(ppe))
    })
  }

  ppeDetailsModal(onboarding: any){
    try {
      this.openPpeModal = true;
      this.candidateId = onboarding.candidateId;
      if (onboarding.ppeDetails && onboarding.ppeDetails.length > 0) {     
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

  submitPpeDetailsForm(){
    try {
      console.log(this.ppeDetails.value);

      const data = {
        candidateId: this.candidateId,
        ppeDetails: this.ppeDetails.value
      };

      console.log(data);

      this.apiService.updatePpeDetails(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Updated PPE Details'});
          this.openPpeModal = false;
          this.fetchOnboardingCandidateList();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  submitOnboardingForm(onboardingForm: any){
    console.log(onboardingForm);
    
    const data = {
      employmentDetails: {
        employmentId: onboardingForm.employmentDetails.employmentId,
        expectedJoiningDate: onboardingForm.employmentDetails.expectedJoiningDate,
        joiningDate: onboardingForm.employmentDetails.joiningDate
      },
      phoneNumber: onboardingForm.phoneNumber,
      alternativeNumber: onboardingForm.alternativeNumber,
      uan: onboardingForm.uan,
      aadharNumber: onboardingForm.aadharNumber
    };

    console.log(data);

    this.apiService.updateOnboardCandidates(data).subscribe({
      next: val => {
        console.log(val);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Candidate Details Updated Successfully'});
        setTimeout(() => {       
          this.fetchOnboardingCandidateList();
        }, 1000);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  deletePpeDetails(index: number){
    this.ppeDetails.removeAt(index);
  }

  pageChange(event: any){
    console.log("Event:", event);
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    console.log("checking:", { offSet: this.offSet, pageSize: this.pageSize });
    this.fetchOnboardingCandidateList();
  }

  onDialogClose(){
    this.candidateId = null;
    this.ppeDetailsForm.reset();
    this.ppeDetails.clear();
    this.ppeDetailsList = [];
  }  
}
