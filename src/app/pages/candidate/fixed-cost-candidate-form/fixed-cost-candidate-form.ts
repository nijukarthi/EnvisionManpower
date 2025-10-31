import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-candidate-form',
  imports: [Shared],
  templateUrl: './fixed-cost-candidate-form.html',
  styleUrl: './fixed-cost-candidate-form.scss'
})
export class FixedCostCandidateForm implements OnInit {
  pCodeList: any;
  envisionRoleList: any;
  spnInfoList: any;
  projectDetails: any;
  selectedSpn: any;

  private fb = inject(FormBuilder);

  fixedCostCandidateForm = this.fb.group({
    candidateName: [''],
    positionApplied: [''],
    currentExperience: [0],
    totalExperience: [0],
    highestQualification: [''],
    qualification: [''],
    noticePeriod: [0],
    workingCurrently: [false],
    employmentDetails: this.fb.group({
      project: this.fb.group({
        projectId: [0]
      }),
      spn: this.fb.group({
        spnId: [0]
      }),
      envisionRole: this.fb.group({
        id: [0]
      }),
      joiningDate: [''],
      offerReleaseDate: ['']
    })
  })

  constructor(private apiService: Apiservice, private messageService: MessageService, private router: Router){}

  ngOnInit(): void {
    this.fetchPCodes();
    this.fetchEnvisionRoles();
    this.fetchSpnInfo();
  }

  fixedCostCandidateApi(data: any){
    try {
      this.apiService.createFixedCostCandidate(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Candidate Created Successfully'});
          setTimeout(() => {
            this.router.navigate(['/home/candidate/fixed-cost']);
          }, 2000);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    console.log(this.fixedCostCandidateForm.value);

    const { employmentDetails, ...data } = this.fixedCostCandidateForm.value;
    console.log('Final data to send:', data);
    
    this.fixedCostCandidateApi(data);
  }

  fetchPCodes(){
    try {
      this.apiService.fetchProjectCodes('').subscribe({
        next: val =>{
          console.log(val);
          this.pCodeList = val?.data;
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

  fetchSpnInfo(){
    try {
      this.apiService.fetchSpnInfo('').subscribe({
        next: val => {
          console.log(val);
          this.spnInfoList = val.data;
        },
        error: err => {
          console.log(err);
        } 
      })
    } catch (error) {
      console.log(error);
    }
  }

  selectedPCode(projectId: number){
    try {    
      console.log(projectId);

      const data = {
        projectId: projectId
      }
  
      this.apiService.viewProject(data).subscribe({
        next: val => {
          console.log(val);
          this.projectDetails = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  selectedSPN(spnId: number){
    this.selectedSpn = this.spnInfoList.find((spn: any) => spn.spnId === spnId);

    const spnGroup = this.fixedCostCandidateForm.get('employmentDetails.spn');
    spnGroup?.patchValue({
      spnId: spnId
    })
  }

  addExistingCandidate(){
    console.log(this.fixedCostCandidateForm.value);
    const data = this.fixedCostCandidateForm.value;

    this.fixedCostCandidateApi(data);
  }
}
